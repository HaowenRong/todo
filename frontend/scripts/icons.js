
export function editIcon() {
  const editBtn = document.createElement('img');
  editBtn.src   = '/frontend/assets/edit.svg';
  editBtn.alt   = 'SVG Image';
  editBtn.className = 'optionBtn';

  return editBtn;
}

export function plusIcon() {
  const plusIcon = document.createElement('img');
  plusIcon.src   = '/frontend/assets/plus.svg';
  plusIcon.alt   = 'SVG Image';
  plusIcon.className = 'optionBtn';

  return plusIcon;
}

export function crossIcon() {
  const crossIcon = document.createElement('img');
  crossIcon.src   = '/frontend/assets/cross.svg';
  crossIcon.alt   = 'SVG Image';
  crossIcon.className = 'optionBtn';

  return crossIcon;
}
