export class UserInfo {
  constructor(nameSelector, professionSelector, avatarSelector) {
    this.name = document.querySelector(nameSelector);
    this.profession = document.querySelector(professionSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserId() {
    return this.id;
  }

  getUserInfo() {
    return {
      'id': this.id,
      'name': this.name.textContent,
      'profession': this.profession.textContent,
      'avatar': this._getAvatarBackgroundImage()
    }; 
  }

  setUserInfo(userInfo) {
    const { id: newId, name: newName, profession: newProfession, avatar: newAvatar } = userInfo;
    this.id = newId;
    this.name.textContent = newName;
    this.profession.textContent = newProfession;
    this.avatar.style.backgroundImage = `url('${newAvatar}')`;
  }

  _getAvatarBackgroundImage() {
    const raw = window.getComputedStyle(this.avatar).getPropertyValue('background-image');
    return raw.slice(4, -1).replace(/"/g, "");
  }
}