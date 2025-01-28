import { Group } from "@prisma/client";
import { CreateGroupAttributes, GroupsRepository } from "../GroupsRepository";
import { prisma } from "../../database";

export class PrismaGroupsRepository implements GroupsRepository {
    async find(): Promise<Group[]> {
        return prisma.group.findMany()
    }
    async findById(id: number): Promise<Group | null> {
        return prisma.group.findUnique({ where: { id: id } })
    }
    async create(attributes: CreateGroupAttributes): Promise<Group> {
        return prisma.group.create({ data: attributes })
    }
    async updateById(id: number, attributes: Partial<CreateGroupAttributes>): Promise<Group | null> {
        return prisma.group.update({
            where: {
                id: id
            },
            data: attributes
        })
    }
    async deleteById(id: number): Promise<Group | null> {
        return prisma.group.delete({ where: { id: id }})
    }

    async addLeadToGroup(leadId: number, groupId: number): Promise<Group>{
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: { connect: { id: leadId } }
            },
            include: { leads: true }
        })
    }

    async removeLeadFromGroup(leadId: number, groupId: number): Promise<Group>{
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: { disconnect: { id: leadId } }
            },
            include: { leads: true }
        })
    }
}