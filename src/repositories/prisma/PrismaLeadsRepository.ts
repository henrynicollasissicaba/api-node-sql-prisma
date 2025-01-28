import { Lead, Prisma } from "@prisma/client";
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadsRepository";
import { prisma } from "../../database";

export class PrismaLeadsRepository implements LeadsRepository {
    async find({ whereParam, limit, offset, order, sortBy, include }: FindLeadsParams): Promise<Lead[]> {
        let where: Prisma.LeadWhereInput = {
            name: {
                contains: whereParam?.name?.like,
                equals: whereParam?.name?.equals,
                mode: whereParam?.name?.mode
            },
            status: whereParam?.status
        }

        if(whereParam?.groupId) where.groups = { some: { id: whereParam.groupId } }
        if(whereParam?.campaignId) where.campaigns = { some: { campaignId: whereParam.campaignId } }

        return prisma.lead.findMany({
            where: where,
            orderBy: { [sortBy ?? "name"]: order },
            skip: offset,
            take: limit,
            include: {
                groups: include?.groups,
                campaigns: include?.campaigns
            }
        })  
    }

    async findById(id: number): Promise<Lead | null> {
        return prisma.lead.findUnique({ 
            where: { id: id },
            include: {
                campaigns: true,
                groups: true
            }
        })
    }

    async count({ name, status }: LeadWhereParams): Promise<number> {
        return prisma.lead.count({ 
            where: {
                name: { 
                    contains: name?.like, 
                    equals: name?.equals,
                    mode: name?.mode
                },
                status: status
            } 
        })
    }

    async create(attributes: CreateLeadAttributes): Promise<Lead> {
        return prisma.lead.create({ data: attributes })
    }

    async updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead> {
        return prisma.lead.update({
            where: { id: id },
            data: attributes
        })
    }

    async deleteById(id: number): Promise<Lead> {
        return prisma.lead.delete({ where: { id: id }})
    }
}