export class UserInfo {
  constructor(nameSelector, professionSelector) {
    this.name = document.querySelector(nameSelector);
    this.profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    return {
      'name': this.name.textContent,
      'profession': this.profession.textContent 
    }; 
  }

  setUserInfo(userInfo) {
    const { name: newName, profession: newProfession } = userInfo;
    this.name.textContent = newName;
    this.profession.textContent = newProfession;
  }
}