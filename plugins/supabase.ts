import { createClient } from '@supabase/supabase-js/dist/main/index.js';
import { Provider } from '@supabase/gotrue-js/dist/main/lib/types';
import { Session } from '@supabase/gotrue-js/dist/main/lib/types';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  const supabase = createClient(
    // @ts-ignore
    nuxtApp.payload.config.supabaseUrl,
    nuxtApp.payload.config.supabaseKey,
  );
  nuxtApp.provide('supabase', {
    supabase,
    handleOAuthLogin,
    handleLogout,
    handleAddUser,
    getAllUsers,
  });

  // const session = await supabase.auth.session();
  // if (!session) {
  //   nuxtApp.$router.push("/login");
  // } else {
  //   nuxtApp.$router.push("/");
  // }

  supabase.auth.onAuthStateChange((event, session: Session) => {
    console.log('session onAuthStateChange: ', session);
    if (session) {
      nuxtApp.$router.push('/');
    } else {
      nuxtApp.$router.push('/login');
    }
  });

  async function handleOAuthLogin(provider: Provider) {
    const { error } = await supabase.auth.signIn({ provider });
    if (error) console.error('Error: ', error.message);
  }

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert('Error signing out');
        console.error('Error', error);
        return;
      }
      console.log('about to reload');
      window.location.reload();
    } catch (err) {
      alert('Unknown error signing out');
      console.error('Error', err);
    }
  }

  async function handleAddUser(name: String, userIcon, character) {
    const session = supabase.auth.session();
    const user_id = session?.user?.id;
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, user_id, color: userIcon.value, character: character.value }]);
    } catch (error) {
      console.error('handleAddUser error: ', error);
    }
  }

  async function getAllUsers() {
    const session = supabase.auth.session();
    const user_id = session?.user?.id;
    if (!user_id) {
      console.log('redirecing to login');
      nuxtApp.$router.push('/login');
    }
    try {
      const { data, error } = await supabase.from('users').select().eq('user_id', user_id);
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
