const express = require('express');
const router = express.Router();
const { getCurrentPlanType, 
    updateCurrentPlanType ,
    updateAlterPlan,
    revertAlterPlan,
    updateRegularPlan,
    revertRegularPlan,
    getCurrentRegularPlan,
    getCurrentAlterPlan} = require('../controllers/planController');

router.get('/current_plan_type', getCurrentPlanType);
router.post('/update_current_plan_type', updateCurrentPlanType);
router.post('/update_alter_plan', updateAlterPlan);
router.post('/revert_alter_plan', revertAlterPlan);
router.post('/update_regular_plan', updateRegularPlan);
router.post('/revert_regular_plan', revertRegularPlan);
router.get('/current_regular_plan', getCurrentRegularPlan);
router.get('/current_alter_plan', getCurrentAlterPlan);

module.exports = router;
