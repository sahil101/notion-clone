'use server';
import { workspaces } from "../../../migrations/schema"
import db from "./db"
import { Subscription, workspace } from "./supabase.types"

export const getUserSubscriptionStatus = async (userId: string) => {
    try {
        const data = await db.query.subscriptions.findFirst({
            where: (s, { eq }) => eq(s.userId, userId),
        })

        if (data) return { data: data as Subscription, error: null }
        else return { data: null, error: null }
    }
    catch (error) {
        console.log(error)
        return { data: null, error: `Error ${error}` }
    }
}

export const createWorkspace = async (workspace: workspace) => {
    try {
      await db.insert(workspaces).values(workspace);
      return { data: null, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: 'Error' };
    }
  };