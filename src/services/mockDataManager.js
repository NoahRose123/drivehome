/**
 * Mock Data Manager for Demo Purposes
 * 
 * This provides sample data to demonstrate the new dashboard system
 * without requiring Firebase setup
 */

export class MockDataManager {
  static async getFeedSchedules() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data that demonstrates the dashboard capabilities
    return [
      {
        id: '1',
        farm: 'VAS',
        barn: 'B1',
        deliveryDates: [
          { date: '2024-12-15', weight: 5250, formattedDate: 'Dec 15, 2024', originalText: '12/15/2024 5,250 KG' },
          { date: '2024-12-18', weight: 4800, formattedDate: 'Dec 18, 2024', originalText: '12/18/2024 4,800 KG' },
          { date: '2024-12-22', weight: 6100, formattedDate: 'Dec 22, 2024', originalText: '12/22/2024 6,100 KG' }
        ],
        fileName: 'VAS_B1_Schedule_1.pdf',
        uploadDate: new Date('2024-12-01'),
        totalDeliveries: 3,
        totalWeight: 16150,
        averageWeight: 5383
      },
      {
        id: '2',
        farm: 'VAS',
        barn: 'B2',
        deliveryDates: [
          { date: '2024-12-16', weight: 4900, formattedDate: 'Dec 16, 2024', originalText: '12/16/2024 4,900 KG' },
          { date: '2024-12-20', weight: 5300, formattedDate: 'Dec 20, 2024', originalText: '12/20/2024 5,300 KG' }
        ],
        fileName: 'VAS_B2_Schedule_1.pdf',
        uploadDate: new Date('2024-12-02'),
        totalDeliveries: 2,
        totalWeight: 10200,
        averageWeight: 5100
      },
      {
        id: '3',
        farm: 'EDG',
        barn: 'B1',
        deliveryDates: [
          { date: '2024-12-17', weight: 4700, formattedDate: 'Dec 17, 2024', originalText: '12/17/2024 4,700 KG' },
          { date: '2024-12-21', weight: 5200, formattedDate: 'Dec 21, 2024', originalText: '12/21/2024 5,200 KG' },
          { date: '2024-12-25', weight: 5800, formattedDate: 'Dec 25, 2024', originalText: '12/25/2024 5,800 KG' }
        ],
        fileName: 'EDG_B1_Schedule_1.pdf',
        uploadDate: new Date('2024-12-03'),
        totalDeliveries: 3,
        totalWeight: 15700,
        averageWeight: 5233
      },
      {
        id: '4',
        farm: 'APO',
        barn: 'B1',
        deliveryDates: [
          { date: '2024-12-19', weight: 5100, formattedDate: 'Dec 19, 2024', originalText: '12/19/2024 5,100 KG' },
          { date: '2024-12-23', weight: 5600, formattedDate: 'Dec 23, 2024', originalText: '12/23/2024 5,600 KG' }
        ],
        fileName: 'APO_B1_Schedule_1.pdf',
        uploadDate: new Date('2024-12-04'),
        totalDeliveries: 2,
        totalWeight: 10700,
        averageWeight: 5350
      },
      {
        id: '5',
        farm: 'SIG',
        barn: 'B1',
        deliveryDates: [
          { date: '2024-12-24', weight: 5400, formattedDate: 'Dec 24, 2024', originalText: '12/24/2024 5,400 KG' },
          { date: '2024-12-28', weight: 5900, formattedDate: 'Dec 28, 2024', originalText: '12/28/2024 5,900 KG' }
        ],
        fileName: 'SIG_B1_Schedule_1.pdf',
        uploadDate: new Date('2024-12-05'),
        totalDeliveries: 2,
        totalWeight: 11300,
        averageWeight: 5650
      }
    ];
  }

  static async saveFeedSchedule(scheduleData, file) {
    // Mock save operation
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: Date.now().toString(), ...scheduleData };
  }

  static async batchSaveFeedSchedules(schedulesData) {
    // Mock batch save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return schedulesData.map((data, index) => ({ id: (Date.now() + index).toString(), ...data }));
  }
}
