import { getSupabase } from "@/lib/supabase";
import { fetchPage, PageSnapshot } from "./fetch-page";

export async function addCompetitor(url: string, name?: string, userId?: string) {
  const { data, error } = await getSupabase()
    .from("competitors")
    .insert({ url, name: name || new URL(url).hostname, user_id: userId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listCompetitors(userId?: string) {
  let query = getSupabase()
    .from("competitors")
    .select("*")
    .order("created_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function scrapeAndStore(competitorId: number, url: string) {
  const snapshot = await fetchPage(url);

  const { data, error } = await getSupabase()
    .from("snapshots")
    .insert({
      competitor_id: competitorId,
      title: snapshot.title,
      description: snapshot.description,
      headings: snapshot.headings,
      body_text: snapshot.bodyText,
      links: snapshot.links,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { snapshot, record: data };
}

export async function getLatestSnapshots(competitorId: number, limit = 2) {
  const { data, error } = await getSupabase()
    .from("snapshots")
    .select("*")
    .eq("competitor_id", competitorId)
    .order("scraped_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
}
