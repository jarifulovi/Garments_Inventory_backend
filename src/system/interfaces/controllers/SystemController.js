import { SystemService } from '../../SystemService.js';

// Create service instance
const systemService = new SystemService();

// Express controller for handling system-related HTTP requests
export class SystemController {
  // GET /api/system/totaldoc - Get simple total document counts for all 4 schemas
  static async getTotalDocOverview(req, res) {
    try {
      const overview = await systemService.getTotalDocOverview();
      
      res.json({
        success: true,
        data: overview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get total document overview',
        error: error.message
      });
    }
  }

  // GET /api/system/overview - Get overall overview with counts and basic metrics
  static async getOverallOverview(req, res) {
    try {
      const overview = await systemService.getOverallOverview();
      
      res.json({
        success: true,
        data: overview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get overall overview',
        error: error.message
      });
    }
  }

  // GET /api/system/stats - Get detailed statistics with aggregations
  static async getDetailedStats(req, res) {
    try {
      const stats = await systemService.getDetailedStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get detailed statistics',
        error: error.message
      });
    }
  }

  // GET /api/system/health - Get system health metrics and alerts
  static async getSystemHealth(req, res) {
    try {
      const health = await systemService.getSystemHealth();
      
      res.json({
        success: true,
        data: health
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get system health',
        error: error.message
      });
    }
  }

  // GET /api/system/combined - Combined endpoint for dashboard with basic overview
  static async getSystemOverview(req, res) {
    try {
      const [overview, health] = await Promise.all([
        systemService.getOverallOverview(),
        systemService.getSystemHealth()
      ]);
      
      res.json({
        success: true,
        data: {
          overview,
          alerts: health.alerts,
          generatedAt: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get system overview',
        error: error.message
      });
    }
  }
}

export default SystemController;
