/**
 * SIMPLE Data Manager for Feed Schedules
 * 
 * This is a much simpler approach that:
 * 1. Uses CDN Firebase to avoid Vite issues
 * 2. Focuses on core functionality only
 * 3. Has better error handling
 */

import { initializeFirebase } from './firebase';

export class DataManager {
  /**
   * Save a single feed schedule
   */
  static async saveFeedSchedule(scheduleData, file) {
    try {
      console.log('💾 Saving feed schedule...');
      
      const { db } = await initializeFirebase();
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      // Convert file to base64
      const base64Data = await this.fileToBase64(file);
      
      const feedScheduleData = {
        farm: scheduleData.farm,
        barn: scheduleData.barn,
        deliveryDates: scheduleData.deliveryDates,
        fileName: file.name,
        fileData: base64Data,
        fileSize: file.size,
        uploadDate: window.firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        totalDeliveries: scheduleData.deliveryDates.length,
        totalWeight: scheduleData.deliveryDates.reduce((sum, d) => sum + d.weight, 0)
      };
      
      const docRef = await db.collection('feed_schedules').add(feedScheduleData);
      console.log('✅ Feed schedule saved:', docRef.id);
      
      return {
        id: docRef.id,
        ...feedScheduleData
      };
      
    } catch (error) {
      console.error('❌ Error saving feed schedule:', error);
      throw new Error(`Failed to save: ${error.message}`);
    }
  }
  
  /**
   * Get all feed schedules
   */
  static async getFeedSchedules() {
    try {
      console.log('📥 Fetching feed schedules...');
      
      const { db } = await initializeFirebase();
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const querySnapshot = await db.collection('feed_schedules').orderBy('uploadDate', 'desc').get();
      const schedules = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        schedules.push({
          id: doc.id,
          ...data,
          uploadDate: data.uploadDate ? data.uploadDate.toDate() : null
        });
      });
      
      console.log(`✅ Fetched ${schedules.length} schedules`);
      return schedules;
      
    } catch (error) {
      console.error('❌ Error fetching schedules:', error);
      throw new Error(`Failed to fetch: ${error.message}`);
    }
  }
  
  /**
   * Batch save multiple schedules
   */
  static async batchSaveFeedSchedules(schedulesData) {
    try {
      console.log(`🔄 Batch saving ${schedulesData.length} schedules...`);
      
      const { db } = await initializeFirebase();
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      const batch = db.batch();
      const results = [];
      const errors = [];
      
      for (const scheduleData of schedulesData) {
        try {
          const docRef = db.collection('feed_schedules').doc();
          const base64Data = await this.fileToBase64(scheduleData.file);
          
          const feedScheduleData = {
            farm: scheduleData.data.farm,
            barn: scheduleData.data.barn,
            deliveryDates: scheduleData.data.deliveryDates,
            fileName: scheduleData.file.name,
            fileData: base64Data,
            fileSize: scheduleData.file.size,
            uploadDate: window.firebase.firestore.FieldValue.serverTimestamp(),
            status: 'active',
            totalDeliveries: scheduleData.data.deliveryDates.length,
            totalWeight: scheduleData.data.deliveryDates.reduce((sum, d) => sum + d.weight, 0)
          };
          
          batch.set(docRef, feedScheduleData);
          
          results.push({
            fileName: scheduleData.file.name,
            success: true,
            id: docRef.id
          });
          
        } catch (error) {
          errors.push({
            fileName: scheduleData.file.name,
            success: false,
            error: error.message
          });
        }
      }
      
      await batch.commit();
      
      console.log(`✅ Batch save completed: ${results.length} successful, ${errors.length} failed`);
      
      return {
        successful: results,
        failed: errors,
        totalProcessed: schedulesData.length
      };
      
    } catch (error) {
      console.error('❌ Batch save failed:', error);
      throw new Error(`Batch save failed: ${error.message}`);
    }
  }
  
  /**
   * Convert file to base64
   */
  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  /**
   * Delete a schedule
   */
  static async deleteFeedSchedule(scheduleId) {
    try {
      const { db } = await initializeFirebase();
      if (!db) {
        throw new Error('Firebase not initialized');
      }
      
      await db.collection('feed_schedules').doc(scheduleId).delete();
      console.log('✅ Schedule deleted:', scheduleId);
      return true;
      
    } catch (error) {
      console.error('❌ Error deleting schedule:', error);
      throw new Error(`Failed to delete: ${error.message}`);
    }
  }
}
