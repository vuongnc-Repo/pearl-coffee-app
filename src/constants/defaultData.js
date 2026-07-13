export const defaultStock = [
  { id: 'stk_001', name: 'Arabica Coffee Beans', category: 'beans', quantity: 5000, unit: 'grams', minThreshold: 1000, costPerUnit: 0.05, supplier: 'Highland Farms', lastRestocked: '2026-07-10T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_002', name: 'Robusta Coffee Beans', category: 'beans', quantity: 3000, unit: 'grams', minThreshold: 800, costPerUnit: 0.03, supplier: 'Highland Farms', lastRestocked: '2026-07-08T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_003', name: 'Whole Milk', category: 'dairy', quantity: 15000, unit: 'ml', minThreshold: 3000, costPerUnit: 0.003, supplier: 'Green Valley Dairy', lastRestocked: '2026-07-12T06:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_004', name: 'Oat Milk', category: 'dairy', quantity: 8000, unit: 'ml', minThreshold: 2000, costPerUnit: 0.005, supplier: 'Plant Plus', lastRestocked: '2026-07-11T06:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_005', name: 'White Sugar', category: 'sweeteners', quantity: 4000, unit: 'grams', minThreshold: 500, costPerUnit: 0.002, supplier: 'Sweet Supply Co', lastRestocked: '2026-07-05T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_006', name: 'Vanilla Syrup', category: 'syrups', quantity: 2500, unit: 'ml', minThreshold: 500, costPerUnit: 0.015, supplier: 'Flavor House', lastRestocked: '2026-07-09T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_007', name: 'Caramel Syrup', category: 'syrups', quantity: 1800, unit: 'ml', minThreshold: 500, costPerUnit: 0.015, supplier: 'Flavor House', lastRestocked: '2026-07-09T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_008', name: 'Chocolate Sauce', category: 'syrups', quantity: 1200, unit: 'ml', minThreshold: 400, costPerUnit: 0.02, supplier: 'Flavor House', lastRestocked: '2026-07-07T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_009', name: 'Paper Cups 12oz', category: 'supplies', quantity: 500, unit: 'pieces', minThreshold: 100, costPerUnit: 0.08, supplier: 'EcoPack', lastRestocked: '2026-07-06T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'stk_010', name: 'Matcha Powder', category: 'other', quantity: 300, unit: 'grams', minThreshold: 100, costPerUnit: 0.12, supplier: 'Kyoto Matcha Co', lastRestocked: '2026-07-04T08:00:00Z', createdAt: '2026-06-01T00:00:00Z' },
];

export const defaultEmployees = [
  { id: 'emp_001', name: 'Maria Santos', role: 'barista', phone: '555-0101', email: 'maria@pearl.coffee', status: 'active', hireDate: '2026-01-15' },
  { id: 'emp_002', name: 'Alex Kim', role: 'barista', phone: '555-0102', email: 'alex@pearl.coffee', status: 'active', hireDate: '2026-02-01' },
  { id: 'emp_003', name: 'Jordan Lee', role: 'barista', phone: '555-0103', email: 'jordan@pearl.coffee', status: 'active', hireDate: '2026-03-10' },
  { id: 'emp_004', name: 'Sophie Tran', role: 'cashier', phone: '555-0104', email: 'sophie@pearl.coffee', status: 'active', hireDate: '2026-01-20' },
  { id: 'emp_005', name: 'Daniel Nguyen', role: 'manager', phone: '555-0105', email: 'daniel@pearl.coffee', status: 'active', hireDate: '2025-11-01' },
];

export const defaultRecipes = [
  {
    id: 'rcp_001', name: 'Espresso', category: 'hot', description: 'Classic double shot espresso', servingSize: '2oz', prepTimeMinutes: 2, sellingPrice: 3.50,
    ingredients: [{ stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' }],
    steps: ['Grind 18g of Arabica beans to fine', 'Tamp evenly in portafilter', 'Extract for 25-30 seconds'],
  },
  {
    id: 'rcp_002', name: 'Americano', category: 'hot', description: 'Espresso with hot water', servingSize: '12oz', prepTimeMinutes: 3, sellingPrice: 4.00,
    ingredients: [{ stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' }],
    steps: ['Pull a double shot of espresso', 'Add 200ml hot water', 'Serve immediately'],
  },
  {
    id: 'rcp_003', name: 'Latte', category: 'hot', description: 'Espresso with steamed milk', servingSize: '12oz', prepTimeMinutes: 4, sellingPrice: 5.00,
    ingredients: [
      { stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' },
      { stockId: 'stk_003', name: 'Whole Milk', quantity: 240, unit: 'ml' },
    ],
    steps: ['Pull a double shot of espresso', 'Steam 240ml whole milk to 65°C', 'Pour steamed milk over espresso with latte art'],
  },
  {
    id: 'rcp_004', name: 'Cappuccino', category: 'hot', description: 'Equal parts espresso, steamed milk, and foam', servingSize: '8oz', prepTimeMinutes: 4, sellingPrice: 4.50,
    ingredients: [
      { stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' },
      { stockId: 'stk_003', name: 'Whole Milk', quantity: 120, unit: 'ml' },
    ],
    steps: ['Pull a double shot of espresso', 'Steam 120ml milk with extra foam', 'Pour with thick foam layer on top'],
  },
  {
    id: 'rcp_005', name: 'Caramel Latte', category: 'hot', description: 'Rich espresso with steamed milk and caramel drizzle', servingSize: '12oz', prepTimeMinutes: 5, sellingPrice: 5.50,
    ingredients: [
      { stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' },
      { stockId: 'stk_003', name: 'Whole Milk', quantity: 240, unit: 'ml' },
      { stockId: 'stk_007', name: 'Caramel Syrup', quantity: 30, unit: 'ml' },
    ],
    steps: ['Pull a double shot of espresso', 'Steam 240ml whole milk to 65°C', 'Pour steamed milk over espresso', 'Drizzle 30ml caramel syrup on top'],
  },
  {
    id: 'rcp_006', name: 'Mocha', category: 'hot', description: 'Espresso with chocolate and steamed milk', servingSize: '12oz', prepTimeMinutes: 5, sellingPrice: 5.50,
    ingredients: [
      { stockId: 'stk_001', name: 'Arabica Coffee Beans', quantity: 18, unit: 'grams' },
      { stockId: 'stk_003', name: 'Whole Milk', quantity: 200, unit: 'ml' },
      { stockId: 'stk_008', name: 'Chocolate Sauce', quantity: 30, unit: 'ml' },
    ],
    steps: ['Pull a double shot of espresso', 'Mix chocolate sauce with espresso', 'Steam 200ml milk', 'Pour over chocolate espresso'],
  },
  {
    id: 'rcp_007', name: 'Iced Coffee', category: 'iced', description: 'Chilled brewed coffee over ice', servingSize: '16oz', prepTimeMinutes: 3, sellingPrice: 4.50,
    ingredients: [
      { stockId: 'stk_002', name: 'Robusta Coffee Beans', quantity: 25, unit: 'grams' },
      { stockId: 'stk_005', name: 'White Sugar', quantity: 10, unit: 'grams' },
    ],
    steps: ['Brew strong coffee with 25g beans', 'Add sugar while hot', 'Pour over a full glass of ice'],
  },
  {
    id: 'rcp_008', name: 'Matcha Latte', category: 'specialty', description: 'Ceremonial grade matcha with oat milk', servingSize: '12oz', prepTimeMinutes: 4, sellingPrice: 5.50,
    ingredients: [
      { stockId: 'stk_010', name: 'Matcha Powder', quantity: 3, unit: 'grams' },
      { stockId: 'stk_004', name: 'Oat Milk', quantity: 280, unit: 'ml' },
    ],
    steps: ['Sift 3g matcha powder into bowl', 'Add 30ml hot water and whisk until smooth', 'Steam 280ml oat milk', 'Pour matcha into steamed milk'],
  },
];

function generateOrders() {
  const orders = [];
  const recipes = defaultRecipes;
  const now = new Date();

  for (let i = 0; i < 25; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hour = 7 + Math.floor(Math.random() * 12);
    const minute = Math.floor(Math.random() * 60);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(hour, minute, 0, 0);

    const numItems = 1 + Math.floor(Math.random() * 3);
    const items = [];
    const usedRecipes = new Set();

    for (let j = 0; j < numItems; j++) {
      let recipe;
      do {
        recipe = recipes[Math.floor(Math.random() * recipes.length)];
      } while (usedRecipes.has(recipe.id));
      usedRecipes.add(recipe.id);

      const qty = 1 + Math.floor(Math.random() * 2);
      items.push({ recipeId: recipe.id, name: recipe.name, quantity: qty, unitPrice: recipe.sellingPrice });
    }

    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    orders.push({
      id: `ord_${String(i + 1).padStart(3, '0')}`,
      items,
      total,
      paymentMethod: Math.random() > 0.4 ? 'card' : 'cash',
      status: 'completed',
      createdAt: date.toISOString(),
      createdBy: defaultEmployees[Math.floor(Math.random() * 3)].id,
    });
  }

  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export const defaultOrders = generateOrders();

export const defaultTasks = [
  { id: 'tsk_001', title: 'Restock milk supply', description: 'Order 20L whole milk from dairy supplier', assigneeId: 'emp_001', status: 'done', priority: 'high', dueDate: '2026-07-12', createdAt: '2026-07-10T09:00:00Z', completedAt: '2026-07-12T14:00:00Z' },
  { id: 'tsk_002', title: 'Clean espresso machine', description: 'Deep clean and descale the main espresso machine', assigneeId: 'emp_002', status: 'inprogress', priority: 'medium', dueDate: '2026-07-13', createdAt: '2026-07-12T08:00:00Z', completedAt: null },
  { id: 'tsk_003', title: 'Update menu board', description: 'Add new seasonal drinks to the chalk menu board', assigneeId: 'emp_003', status: 'todo', priority: 'low', dueDate: '2026-07-15', createdAt: '2026-07-13T09:00:00Z', completedAt: null },
  { id: 'tsk_004', title: 'Inventory count', description: 'Complete weekly inventory count for all stock items', assigneeId: 'emp_005', status: 'todo', priority: 'high', dueDate: '2026-07-14', createdAt: '2026-07-13T08:00:00Z', completedAt: null },
  { id: 'tsk_005', title: 'Train new latte art', description: 'Practice rosetta and tulip patterns', assigneeId: 'emp_001', status: 'inprogress', priority: 'medium', dueDate: '2026-07-16', createdAt: '2026-07-11T10:00:00Z', completedAt: null },
  { id: 'tsk_006', title: 'Fix cold brew tap', description: 'Cold brew tap is dripping, needs new washer', assigneeId: 'emp_002', status: 'todo', priority: 'high', dueDate: '2026-07-14', createdAt: '2026-07-13T07:00:00Z', completedAt: null },
  { id: 'tsk_007', title: 'Order paper cups', description: 'Running low on 12oz cups, order from EcoPack', assigneeId: 'emp_004', status: 'done', priority: 'medium', dueDate: '2026-07-11', createdAt: '2026-07-09T09:00:00Z', completedAt: '2026-07-11T11:00:00Z' },
  { id: 'tsk_008', title: 'Prepare for health inspection', description: 'Ensure all areas are clean and documentation is ready', assigneeId: 'emp_005', status: 'inprogress', priority: 'high', dueDate: '2026-07-17', createdAt: '2026-07-12T08:00:00Z', completedAt: null },
];

export const defaultShifts = (() => {
  const shifts = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const shiftPatterns = {
    emp_001: { start: '07:00', end: '15:00' },
    emp_002: { start: '10:00', end: '18:00' },
    emp_003: { start: '14:00', end: '22:00' },
    emp_004: { start: '08:00', end: '16:00' },
    emp_005: { start: '09:00', end: '17:00' },
  };

  let id = 1;
  for (let day = 0; day < 7; day++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + day);
    const dateStr = date.toISOString().split('T')[0];

    for (const [empId, pattern] of Object.entries(shiftPatterns)) {
      if (day < 5 || (day >= 5 && ['emp_001', 'emp_003', 'emp_004'].includes(empId))) {
        shifts.push({
          id: `shf_${String(id++).padStart(3, '0')}`,
          employeeId: empId,
          date: dateStr,
          startTime: pattern.start,
          endTime: pattern.end,
          role: defaultEmployees.find(e => e.id === empId)?.role || 'barista',
        });
      }
    }
  }
  return shifts;
})();