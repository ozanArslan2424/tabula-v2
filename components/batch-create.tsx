// "use client";
// import Button from "@/components/ui/buttons/button";
// import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
// import Checkbox from "@/components/ui/inputs/checkbox";
// import Input from "@/components/ui/inputs/input";
// import Label from "@/components/ui/label";
// import { BadgePlusIcon, PlusIcon } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function BatchCreate({ userId }: { userId: string }) {
//   const [noteTitles, setNoteTitles] = useState<string[]>([]);
//   const [noteTitle, setNoteTitle] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [hasTasks, setHasTasks] = useState(false);
//   const [open, setOpen] = useState(false);

//   // TODO: batch create notes
//   export const batchCreateNotes = async (
//     title: string,
//     description: string,
//     hasTasks: boolean,
//     noteTitles: string[],
//     userId: string,
//   ) => {
//     console.log("batchCreateNotes");

//     const book = await createBook({ userId, title, description, hasTasks }).then((data) => data.book);
//     if (!book) return { error: "Bir hata oluştu, daha sonra tekrar deneyin." };

//     await db.transaction(async (trx) => {
//       noteTitles.forEach(async (noteTitle) => {
//         const generatedNoteId = uuid();
//         await trx.insert(noteTable).values({
//           id: generatedNoteId,
//           bookId: book[0].bookId,
//           title: noteTitle,
//         });
//       });
//     });
//     revalidatePath("/dash", "page");
//     return { success: "Notlar oluşturuldu." };
//   };

//   const handleCreate = () => {
//     batchCreateNotes(title, description, hasTasks, noteTitles, userId).then((res) => {
//       setOpen(false);
//       if (res?.error) {
//         return toast.error(res.error);
//       } else {
//         toast.success(res.success);
//         setTitle("");
//         setDescription("");
//         setHasTasks(false);
//         setNoteTitles([]);
//       }
//     });
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setTitle("");
//     setDescription("");
//     setHasTasks(false);
//     setNoteTitles([]);
//   };

//   return (
//     <Dialog open={open} onOpenChange={() => setOpen(!open)}>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="gap-2 bg-background">
//           <BadgePlusIcon size={16} className="shrink-0" />
//           <span>Toplu Oluştur</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <div className="flex flex-col gap-2">
//           <Label>
//             <span>Kitap Başlığı</span>
//             <Input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//               id="title"
//               name="title"
//               className="capitalize"
//               required
//               placeholder="Kitap Adı"
//             />
//           </Label>
//           <Label>
//             <span>Kitap Açıklaması</span>
//             <Input
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               type="text"
//               id="description"
//               name="description"
//               placeholder="Kısa Bir Açıklama"
//             />
//           </Label>

//           <Checkbox id="hasTasks" name="hasTasks" onChange={() => setHasTasks(!hasTasks)} checked={hasTasks}>
//             Yapılacaklar listesi
//           </Checkbox>

//           <form
//             className="my-6"
//             onSubmit={(e) => {
//               e.preventDefault();
//               setNoteTitles([...noteTitles, noteTitle]);
//               setNoteTitle("");
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <Label>
//                 <span>Not Başlığı</span>
//                 <Input
//                   type="text"
//                   id="noteTitle"
//                   name="noteTitle"
//                   onChange={(e) => setNoteTitle(e.target.value)}
//                   value={noteTitle}
//                 />
//               </Label>
//               <Button size="circle" type="submit">
//                 <PlusIcon size={16} />
//               </Button>
//             </div>
//             <ol className="px-8 py-2">
//               {noteTitles.map((noteTitle, index) => (
//                 <li className="list-decimal" key={index}>
//                   {noteTitle}
//                 </li>
//               ))}
//             </ol>
//           </form>
//         </div>
//         <DialogFooter className="mt-4">
//           <Button onClick={handleClose} variant="secondary" type="button">
//             Vazgeç
//           </Button>

//           <Button onClick={handleCreate} type="button">
//             Oluştur
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
