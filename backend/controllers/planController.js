const Bus = require('../models/Bus');

exports.getCurrentPlanType = async (req, res) => {
    try {
        const bus = await Bus.findOne();
        if (!bus || !bus.currentPlan) {
            return res.status(404).json({ message: 'No active bus data available' });
        }
        const currentPlan = bus.currentPlan;

        if (!currentPlan) {
            return res.status(404).json({ message: 'No active regular plan available' });
        }
        
        res.status(200).json({ currentPlan });
    } catch (error) {
        console.error('Error fetching current regular plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateCurrentPlanType = async (req, res) => {
    try {
        const { planType } = req.body;
        let bus = await Bus.findOne();
        if (bus) {
            bus.currentPlan = planType;
        } else {
            bus = new Bus({ currentPlan: planType });
        }
        await bus.save();
        res.status(200).json({ message: 'Bus data updated successfully', currentPlan: bus.currentPlan });
    } catch (error) {
        console.error('Error updating bus data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateAlterPlan = async (req, res) => {
    try {
        const { start_date, end_date, filterOptions, planData, plan_status } = req.body;

        console.log("filterOptions", filterOptions);
        // Find any bus document
        let bus = await Bus.findOne();

        if (bus) {
            // Backup existing AlterPlans before replacing
            if (bus.AlterPlans) {
                bus.BackupAlterPlans = bus.AlterPlans;
                bus.BackupAlterPlans.plan_status = 'Backup Plan';
            }

            // Replace the existing plan with the new plan in AlterPlans
            bus.AlterPlans = {
                start_date,
                end_date,
                plan_status,
                filterOptions: filterOptions,
                plans: planData, // Assuming planData is an object, not an array
            };
        } else {
            // If no bus document found, create a new one
            bus = new Bus({
                AlterPlans: {
                    start_date,
                    end_date,
                    plan_status,
                    filterOptions: filterOptions,
                    plans: planData, // Assuming planData is an object, not an array
                }
            });
        }

        // Save the updated bus document
        await bus.save();

        res.status(200).json({ message: 'Alter plan updated successfully' });
    } catch (error) {
        console.error('Error updating Alter plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.revertAlterPlan = async (req, res) => {
    try {
        // Find any bus document
        let bus = await Bus.findOne();
        if (bus && bus.BackupAlterPlans) {
            // Revert to the backup Alter plan
            bus.AlterPlans = bus.BackupAlterPlans;
            bus.AlterPlans.plan_status = 'Active Plan';
            // Clear the backup Alter plan after reverting
            bus.BackupAlterPlans = null;
            // Save the updated bus document
            await bus.save();
            res.status(200).json({ message: 'Alter plan reverted successfully' });
        } else {
            res.status(404).json({ message: 'No backup Alter plans available' });
        }
    } catch (error) {
        console.error('Error reverting Alter plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateRegularPlan = async (req, res) => {
    try {
        const { start_date, end_date, filterOptions, planData, plan_status } = req.body;

        // Find any bus document
        let bus = await Bus.findOne();

        if (bus) {
            // Backup existing AlterPlans before replacing
            if (bus.RegularPlans) {
                bus.BackupRegularPlans = bus.RegularPlans;
                bus.BackupRegularPlans.plan_status = 'Backup Plan';
            }

            // Replace the existing plan with the new plan in RegularPlans
            bus.RegularPlans = {
                start_date,
                end_date,
                plan_status,
                filterOptions: filterOptions,
                plans: planData, // Assuming planData is an object, not an array
            };
        } else {
            // If no bus document found, create a new one
            bus = new Bus({
                RegularPlans: {
                    start_date,
                    end_date,
                    plan_status,
                    filterOptions: filterOptions,
                    plans: planData, // Assuming planData is an object, not an array
                }
            });
        }

        // Save the updated bus document
        await bus.save();

        res.status(200).json({ message: 'Regular plan updated successfully' });
    } catch (error) {
        console.error('Error updating Regular plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.revertRegularPlan = async (req, res) => {
    try {
        // Find any bus document
        let bus = await Bus.findOne();

        if (bus && bus.BackupRegularPlans) {
            // Revert to the backup regular plan
            bus.RegularPlans = bus.BackupRegularPlans;
            bus.RegularPlans.plan_status = 'Active Plan';
            // Clear the backup regular plan after reverting
            bus.BackupRegularPlans = null;
            // Save the updated bus document
            await bus.save();
            res.status(200).json({ message: 'Regular plan reverted successfully' });
        } else {
            res.status(404).json({ message: 'No backup regular plans available' });
        }
    } catch (error) {
        console.error('Error reverting regular plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCurrentRegularPlan = async (req, res) => {
    try {
        // Find the bus document with the active regular plan
        const bus = await Bus.findOne({ 'RegularPlans.plan_status': 'Active Plan' });

        if (!bus || !bus.RegularPlans) {
            return res.status(404).json({ message: 'No active regular plan available' });
        }

        // Find the active regular plan
        const activeRegularPlan = bus.RegularPlans;

        if (!activeRegularPlan) {
            return res.status(404).json({ message: 'No active regular plan available' });
        }

        res.status(200).json({ plan: activeRegularPlan });
    } catch (error) {
        console.error('Error fetching current regular plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCurrentAlterPlan = async (req, res) => {
    try {
        // Find the bus document with the active regular plan
        const bus = await Bus.findOne({ 'AlterPlans.plan_status': 'Active Plan' });

        if (!bus || !bus.AlterPlans) {
            return res.status(404).json({ message: 'No active Alter plan available' });
        }

        // Find the active Alter plan
        const activeAlterPlan = bus.AlterPlans;

        if (!activeAlterPlan) {
            return res.status(404).json({ message: 'No active Alter plan available' });
        }

        res.status(200).json({ plan: activeAlterPlan });
    } catch (error) {
        console.error('Error fetching current Alter plan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};