import { ITask } from "types/Task.d";

/**
 * @author Tom Whitticase
 *
 * @description functions for calculating statistics for a project
 */

export function getCompletedTasksCount(tasks: ITask[]) {
  let completedTasks = tasks.filter((task) => task.status === "completed");
  return completedTasks.length;
}
export function getRemainingTasksCount(tasks: ITask[]) {
  let remainingTasks = tasks.filter((task) => task.status !== "completed");
  return remainingTasks.length;
}
export function getTotalTasksCount(tasks: ITask[]) {
  let totalTasks = tasks;
  return totalTasks.length;
}
export function getCompletedTasksPercentage(tasks: ITask[]) {
  return Math.round(
    (getCompletedTasksCount(tasks) / getTotalTasksCount(tasks)) * 100
  );
}
export function getCompletedManHours(tasks: ITask[]) {
  let completedManHours = 0;
  tasks.map((task) => {
    if (task.status === "completed") completedManHours += task.manHours;
  });
  return completedManHours;
}
export function getRemainingManHours(tasks: ITask[]) {
  let remainingManHours = 0;
  tasks.map((task) => {
    if (task.status !== "completed") remainingManHours += task.manHours;
  });
  return remainingManHours;
}
export function getTotalManHours(tasks: ITask[]) {
  let totalManHours = 0;
  tasks.map((task) => {
    totalManHours += task.manHours;
  });
  return totalManHours;
}
export function getCompletedManHoursPercentage(tasks: ITask[]) {
  return Math.round(
    (getCompletedManHours(tasks) / getTotalManHours(tasks)) * 100
  );
}
