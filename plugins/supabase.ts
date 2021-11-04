import { createClient } from "@supabase/supabase-js/dist/main/index.js";
import { Provider } from "@supabase/gotrue-js/dist/main/lib/types";
import { Session } from "@supabase/gotrue-js/dist/main/lib/types";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = createClient(
    // @ts-ignore
    nuxtApp.payload.config.supabaseUrl,
    nuxtApp.payload.config.supabaseKey
  );
  nuxtApp.provide("supabase", {
    supabase,
    handleOAuthLogin,
    handleLogout,
    handleAddUser,
    getAllUsers
  });

  supabase.auth.onAuthStateChange((event, session: Session) => {
    if (session) {
      nuxtApp.$router.push("/");
    }
  });

  async function handleOAuthLogin(provider: Provider) {
    const { error } = await supabase.auth.signIn({ provider });
    if (error) console.error("Error: ", error.message);
  }

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Error signing out");
        console.error("Error", error);
        return;
      }
      window.location.reload();
    } catch (err) {
      alert("Unknown error signing out");
      console.error("Error", err);
    }
  }

  async function handleAddUser(name: String) {
    const session = supabase.auth.session();
    console.log("session: ", session);
    const user_id = session?.user?.id;
    console.log("user_id: ", user_id);
    try {
      const { data, error } = await supabase.from("users").insert([{ name, user_id }]);
      console.log("data, error: ", data, error);
    } catch (error) {
      console.error("handleAddUser error: ", error);
    }
  }

  async function getAllUsers() {
    const session = supabase.auth.session();
    console.log("session: ", session);
    const user_id = session?.user?.id;
    if (!user_id) {
      console.log("redirecting...", nuxtApp);
      nuxtApp.$router.push("/login");
    }
    try {
      const { data, error } = await supabase.from("users").select().eq("user_id", user_id);
      console.log("data, error: ", data, error);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
});

// declare module "#app" {
//   interface NuxtApp {
//     $hello(msg: string): string;
//   }
// }
