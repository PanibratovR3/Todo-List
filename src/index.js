import { Control } from "./control.js";
import { Project } from "./project.js";
import { DOMTodoList } from "./visualize.js";

DOMTodoList.intitialDraw();
const projects = Control.getStorage();
DOMTodoList.drawAllProjects(projects);
