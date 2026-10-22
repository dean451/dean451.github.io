(function () {
  var canvas = document.getElementById('ascii-waves');
  var ctx = canvas.getContext('2d');
  var snippets = [
    'class Order < ApplicationRecord',
    '  belongs_to :patient',
    '  has_many :line_items, dependent: :destroy',
    '  scope :active, -> { where(status: :open) }',
    '  validates :total, numericality: { greater_than: 0 }',
    'end',
    'Order.includes(:line_items).where(status: "open").order(created_at: :desc)',
    'class AddIndexToOrders < ActiveRecord::Migration[7.1]',
    '  def change',
    '    add_index :orders, :patient_id',
    '  end',
    'end',
    '$ bin/rails db:migrate',
    '== AddIndexToOrders: migrated (0.0412s) ==',
    'NoMethodError: undefined method `name` for nil:NilClass',
    'const [orders, setOrders] = useState([]);',
    'useEffect(() => { fetchOrders().then(setOrders); }, []);',
    'export default function OrderList({ orders }) {',
    '  return <ul>{orders.map(o => <li key={o.id}>{o.name}</li>)}</ul>;',
    '}',
    'fetch("/api/orders").then(res => res.json()).then(console.log);',
    'git commit -m "fix n+1 on orders index"'
  ];
  var alphas = [0.1, 0.2, 0.32];
  var cell = 14;
  var charWidth;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cols;
  var rows;
  var text;
  var lastDraw = 0;

  function buildText() {
    text = [];
    for (var y = 0; y < rows; y++) {
      var line = snippets[y % snippets.length] + '      ';
      text.push(line.repeat(Math.ceil(cols / line.length) + 1).slice(0, cols));
    }
  }

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = cell + 'px monospace';
    ctx.textBaseline = 'top';
    charWidth = ctx.measureText('M').width;
    cols = Math.ceil(window.innerWidth / charWidth);
    rows = Math.ceil(window.innerHeight / cell);
    buildText();
  }

  function draw(t) {
    var dark = document.documentElement.dataset.theme === 'dark';
    var rgb = dark ? '138, 180, 201' : '54, 54, 54';
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var y = 0; y < rows; y++) {
      var buckets = ['', '', ''];
      for (var x = 0; x < cols; x++) {
        var v = Math.sin(x * 0.05 + t * 0.0006) + Math.sin(y * 0.2 + x * 0.03 - t * 0.0009) + Math.sin((x + y) * 0.04 + t * 0.0004);
        var n = (v + 3) / 6;
        var level = n < 0.4 ? -1 : Math.min(2, Math.floor((n - 0.4) / 0.2));
        for (var b = 0; b < 3; b++) {
          buckets[b] += b === level ? text[y][x] : ' ';
        }
      }
      for (var k = 0; k < 3; k++) {
        ctx.fillStyle = 'rgba(' + rgb + ', ' + alphas[k] + ')';
        ctx.fillText(buckets[k], 0, y * cell);
      }
    }
  }

  function frame(t) {
    if (t - lastDraw > 33) {
      draw(t);
      lastDraw = t;
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', function () {
    resize();
    draw(0);
  });
  resize();
  if (reduceMotion) {
    draw(0);
  } else {
    requestAnimationFrame(frame);
  }
})();
