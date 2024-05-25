import type { APIRoute } from "astro";
import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ cookies, request, redirect }) => {

    const form = await request.json() 

    console.log(form)

    try {
        const db = getFirestore(app);
        const ref = await db.collection("jobs").doc(form.uuid).set({
          status: 'unpaid',
          person_A_url: form.filePath_1,
          person_B_url: form.filePath_2,
          timestamp: new Date()
        });

    } catch (e: any) {
        return new Response("Something went wrong", {
          status: 500,
        });
      }

  return redirect("/");
};