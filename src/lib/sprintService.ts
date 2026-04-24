import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const SPRINTS_COLLECTION = "sprints";

export type Sprint = {
  id: string;
  projectId: string;
  uid: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'planned';
  createdAt: string;
};

export const sprintService = {
  // Fetch sprints for a project
  async fetchSprints(projectId: string): Promise<Sprint[]> {
    const q = query(
      collection(db, SPRINTS_COLLECTION), 
      where("projectId", "==", projectId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const sprints: Sprint[] = [];
    querySnapshot.forEach((doc) => {
      sprints.push(doc.data() as Sprint);
    });
    return sprints;
  },

  // Create a new sprint
  async createSprint(sprint: Sprint): Promise<void> {
    const sprintRef = doc(db, SPRINTS_COLLECTION, sprint.id);
    await setDoc(sprintRef, sprint);
  },

  // Update a sprint
  async updateSprint(id: string, updates: Partial<Sprint>): Promise<void> {
    const sprintRef = doc(db, SPRINTS_COLLECTION, id);
    await updateDoc(sprintRef, updates);
  }
};
