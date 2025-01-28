import { Router } from "express";
import { campaignsController, groupsController, leadCampaignController, leadGroupController, leadsController } from "./container";

const router = Router()

// Leads Controller
router.get("/leads", leadsController.index)
router.post("/leads", leadsController.createLead)
router.get("/leads/:id", leadsController.getSingleLead)
router.put("/leads/:id", leadsController.updateLead)
router.delete("/leads/:id", leadsController.deleteLead)

// Groups Controller
router.get("/groups", groupsController.index)
router.post("/groups", groupsController.createGroup)
router.get("/groups/:id", groupsController.getSingleGroup)
router.put("/groups/:id", groupsController.updateGroup)
router.delete("/groups/:id", groupsController.deleteGroup)

router.get("/groups/:groupId/leads", leadGroupController.getLeadsGroup)
router.post("/groups/:groupId/leads", leadGroupController.addLeadGroup)
router.delete("/groups/:groupId/leads/:leadId", leadGroupController.deleteLeadGroup)

// Campaigns Controller
router.get("/campaigns", campaignsController.index)
router.post("/campaigns", campaignsController.createCampaign)
router.get("/campaigns/:id", campaignsController.findSingleCampaign)
router.put("/campaigns/:id", campaignsController.updateCampaign)
router.delete("/campaigns/:id", campaignsController.deleteCampaign)

router.get("/campaigns/:campaignId/leads", leadCampaignController.getLeadsCampaign)
router.post("/campaigns/:campaignId/leads", leadCampaignController.addLeadCampaign)
router.put("/campaigns/:campaignId/leads/:leadId", leadCampaignController.updateLeadCampaign)
router.delete("/campaigns/:campaignId/leads/:leadId", leadCampaignController.deleteLeadCampaign)

// Route for testing database connection
router.get("/status", (req, res, next) => {
    try {
        res.json({ message: "Successfully connected!" })
    } catch (error) {
        next(error)
    }
})

export { router }