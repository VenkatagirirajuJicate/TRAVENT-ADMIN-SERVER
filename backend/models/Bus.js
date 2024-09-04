const mongoose = require('mongoose');

const busesSchema = new mongoose.Schema({
    currentPlan: { type: String },
    RegularPlans: {
        plan_status: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        filterOptions: [{ type: mongoose.Schema.Types.Mixed }],
        plans: [{ type: mongoose.Schema.Types.Mixed }]
    },
    BackupRegularPlans: {
        plan_status: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        filterOptions: [{ type: mongoose.Schema.Types.Mixed }],
        plans: [{ type: mongoose.Schema.Types.Mixed }]
    },
    AlterPlans: {
        plan_status: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        filterOptions: [{ type: mongoose.Schema.Types.Mixed }],
        plans: [{ type: mongoose.Schema.Types.Mixed }]
    },
    BackupAlterPlans: {
        plan_status: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        filterOptions: [{ type: mongoose.Schema.Types.Mixed }],
        plans: [{ type: mongoose.Schema.Types.Mixed }]
    },
    BusesDetails: {
        start_date: { type: Date },
        busData: [{ type: mongoose.Schema.Types.Mixed }]
    },
    BackupBusesDetails: {
        start_date: { type: Date },
        busData: [{ type: mongoose.Schema.Types.Mixed }]
    },
}, { versionKey: false });

module.exports = mongoose.model('Bus', busesSchema);
