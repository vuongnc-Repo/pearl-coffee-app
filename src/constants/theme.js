export const coffeeGradients = [
  'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #8d6e63 100%)',
  'linear-gradient(135deg, #1a0e00 0%, #4e342e 60%, #a1887f 100%)',
  'linear-gradient(135deg, #2c1810 0%, #6d4c41 50%, #d7ccc8 100%)',
  'linear-gradient(135deg, #4e342e 0%, #795548 50%, #bcaaa4 100%)',
  'linear-gradient(135deg, #3e2723 0%, #8d6e63 40%, #efebe9 100%)',
  'linear-gradient(135deg, #1b0000 0%, #4e342e 50%, #8d6e63 100%)',
  'linear-gradient(135deg, #321911 0%, #5d4037 60%, #a1887f 100%)',
  'linear-gradient(135deg, #263238 0%, #455a64 50%, #78909c 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #2d1b00 0%, #6d4c41 40%, #c9a96e 100%)',
];

export const categoryGradients = {
  hot: 'linear-gradient(135deg, #3e2723, #8d6e63)',
  iced: 'linear-gradient(135deg, #1a237e, #42a5f5)',
  blended: 'linear-gradient(135deg, #4a148c, #ce93d8)',
  specialty: 'linear-gradient(135deg, #1b5e20, #66bb6a)',
};

export function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['#c9a96e', '#8d6e63', '#78909c', '#4db6ac', '#7986cb', '#e57373', '#ba68c8'];
  return colors[Math.abs(hash) % colors.length];
}

export function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}