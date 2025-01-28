import { CampaignsController } from "./controllers/CampaignsController"
import { GroupsController } from "./controllers/GroupsController"
import { LeadCampaignController } from "./controllers/LeadCampaignController"
import { LeadGroupController } from "./controllers/LeadGroupController"
import { LeadsController } from "./controllers/LeadsController"
import { PrismaCampaignsRepository } from "./repositories/prisma/PrismaCampaignsRepository"
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository"
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository"
import { LeadsService } from "./services/LeadsService"

// Repositories
export const leadsRepository = new PrismaLeadsRepository()
export const groupsRepository = new PrismaGroupsRepository()
export const campaignsRepository = new PrismaCampaignsRepository()

// Leads controller
export const leadsService = new LeadsService(leadsRepository)

export const leadsController = new LeadsController(leadsService)

// Groups controller
export const groupsController = new GroupsController(groupsRepository)
export const leadGroupController = new LeadGroupController(groupsRepository, leadsRepository)

// Campaigns controller
export const campaignsController = new CampaignsController(campaignsRepository)
export const leadCampaignController = new LeadCampaignController(campaignsRepository, leadsRepository)