import express from 'express';
import SystemController from '../controllers/SystemController.js';

const router = express.Router();

// GET /api/system/totaldoc - Get simple total document counts for all 4 schemas
router.get('/totaldoc', SystemController.getTotalDocOverview);

// GET /api/system/overview - Get overall overview with counts and basic metrics
router.get('/overview', SystemController.getOverallOverview);

// GET /api/system/stats - Get detailed statistics with aggregations
router.get('/stats', SystemController.getDetailedStats);

// GET /api/system/health - Get system health metrics and alerts
router.get('/health', SystemController.getSystemHealth);

// GET /api/system/combined - Combined endpoint for overview with basic overview and alerts
router.get('/combined', SystemController.getSystemOverview);

export default router;
