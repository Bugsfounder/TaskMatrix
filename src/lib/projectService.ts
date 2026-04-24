import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

const PROJECTS_COLLECTION = "projects";

export type Project = {
  id: string;
  uid: string;
  title: string;
  description?: string;
  createdAt: string;
};

export const projectService = {
  // Fetch projects for a specific user
  async fetchProjects(uid: string): Promise<Record<string, Project>> {
    const q = query(collection(db, PROJECTS_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const projects: Record<string, Project> = {};
    querySnapshot.forEach((doc) => {
      projects[doc.id] = doc.data() as Project;
    });
    return projects;
  },

  // Create a new project
  async createProject(project: Project): Promise<void> {
    const projectRef = doc(db, PROJECTS_COLLECTION, project.id);
    await setDoc(projectRef, project);
  },

  // Update an existing project
  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await updateDoc(projectRef, updates);
  },

  // Delete a project
  async deleteProject(projectId: string): Promise<void> {
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    await deleteDoc(projectRef);
  }
};
