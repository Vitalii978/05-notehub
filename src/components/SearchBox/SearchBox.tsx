import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css'



interface SearchBoxProps {
    searchQuery: string;
    onUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox( { searchQuery, onUpdate }: SearchBoxProps ) {  
    return (<input
  type="text"
  onChange={onUpdate}
  value={searchQuery}
  className={css.input}
  placeholder="Search notes..."
  
 />
);
}