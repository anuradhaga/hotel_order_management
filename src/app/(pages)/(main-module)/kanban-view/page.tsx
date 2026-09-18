import { getPageMetadata } from "@/config/metadata";
import KanbanViewClient from "./kanbanViewClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Kanban View');
};
export default function KanbanView(){
    return(
        <><KanbanViewClient/></>
    )
}