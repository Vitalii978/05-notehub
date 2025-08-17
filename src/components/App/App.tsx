import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";
import {fetchNotes } from "../../services/noteService";
import {useState} from "react";
import type {NoteResponse} from "../../services/noteService";
import css from "./App.module.css";

export default function App() {

  
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
  setDebouncedQuery(value);
}, 300);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
    debouncedSetQuery(e.target.value)
  };
  const { data } = useQuery<NoteResponse>({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes(page, debouncedQuery),
    placeholderData: keepPreviousData,
  })
  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox searchQuery={query} onUpdate={handleInputChange}/>
		{totalPages> 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
		<button className={css.button} onClick={openModal}>Create note +</button>
  </header>
  {isModalOpen && <Modal onClose={closeModal}>
    <NoteForm onClose={closeModal}/>
  </Modal>}
  {data?.notes && <NoteList notes={data?.notes}/>}
</div>

  );
}