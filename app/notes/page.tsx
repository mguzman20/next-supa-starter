import { createClient } from '@/utils/supabase/server';
import NotesForm from './form';

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Error fetching user or user not logged in</p>;
  }
  const { data: notes } = await supabase.from('notes').select('*');

  if (!notes) {
    return <p>No notes found</p>;
  }

  return (
    <>
      <div>
        <h1>Your notes</h1>
        {notes.map((note: any) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
          </div>
        ))}
      </div>

      <NotesForm />
    </>
  );
}
