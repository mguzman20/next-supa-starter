'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import NotesForm from '../notes/form';

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select();
      setNotes(data);
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <h1>Your notes</h1>
        {notes &&
          notes.map((note: any) => (
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
