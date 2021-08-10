import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";

export class User extends BaseModel {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = "users";
    // this.ready = [];
    // this.inProgress = [];
    // this.finished = [];
  }

  get hasAccess() {
    let users = getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login == this.login && user.password == this.password)
        return true;
    }
    return false;
  }

  static save(user) {
    try {
      addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  // addTask(task) {
  //   this.ready.push(task)
  // }
  //
  // moveTask(task, source, target) {
  //   for (let i = 0; source.length > i; i++) {
  //     if (task == source[i]) {
  //       target.push(source[i]);
  //       source.splice(i, 1);
  //     }
  //   }
  // }
  //
  // deleteTask(task, target) {
  //   for (let i = 0; target.length > i; i++) {
  //     if (task == target[i]) {
  //       target.splice(i, 1)
  //     }
  //   }
  // }
  //
  // changeTask(task, newTask, target) {
  //   for (let i = 0; target.length > i; i++) {
  //     if (task == target[i]) {
  //       target.splice(i, 1, newTask)
  //     }
  //   }
  // }
}
