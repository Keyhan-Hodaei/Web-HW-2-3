<div dir="rtl">
# تمرین دوم درس برنامه‌سازی وب

کیهان هدائی - ۴۰۱۱۰۶۶۹۶<br>
در این تمرین یک برنامه برای ترسیم نقاشی با استفاده از React در Front-end و Spring Boot در Back-end ساخته‌ایم.

## مراحل و جزئیات پیاده‌سازی

## Front-end

### App.tsx

در ابتدا به فایل App.tsx مراجعه می‌کنیم. این فایل تمامی اجزای اصلی کاربری و اشکال را در کنار هم نگه می‌دارد.


- حالت‌ها (States):
1. shapes: آرایه‌ای از اشیای به فرم {type, x, y} که هر شکل کشیده‌شده را توصیف می‌کند.
2. selectedShape: شکل فعلی که کاربر از Sidebar انتخاب کرده است که شامل دایره، مربع و مثلث می‌باشد.
3. drawingName: عنوانی که در ورودی header نوشته و نمایش داده می‌شود.

<br>

```html
const [shapes, setShapes] = useState<ShapeData[]>([]);
const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
const [drawingName, setDrawingName] = useState<string>('Untitled Drawing');
```

- توابع:
1. exportJSON: آرایه shapes را به JSON تبدیل می‌کند، در یک Blob می‌ریزد و در نهایت با یک کلیک دانلود را آغاز می‌کند.
2. importJSON: فایل JSON انتخاب‌شده را می‌خواند و، داده‌ها را parse می‌کند و shapes را به‌روزرسانی می‌کند.

<br>

```html
const exportJSON = () => {
    const blob = new Blob([JSON.stringify(shapes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = drawingName + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file: File) => {
    file.text().then(txt => {
      try {
        const data = JSON.parse(txt) as ShapeData[];
        setShapes(data);
      } catch (err) {
        console.error('Failed to parse JSON', err);
      }
    });
  };
```

- قرارگیری componentها:
در ابتدا Header در این صفحه قرار می‌گیرد، سپس Canvas و Footer را در یک بخش قرار می‌دهیم و در کنار آن‌ها Sidebar قرار می‌گیرد.

<br>

```html
  return (
    <div className='app-container'>
      <Header drawingName={drawingName} setDrawingName={setDrawingName} exportJSON={exportJSON} importJSON={importJSON} />
      
      <div className='main-content'>
        <div className='canvas-section'>
          <Canvas shapes={shapes} setShapes={setShapes} selectedShape={selectedShape} />
          <Footer shapes={shapes} />
        </div>
        <Sidebar setSelectedShape={setSelectedShape} selectedShape={selectedShape} />
      </div>
    </div>
  );
```


### Header.tsx

این فایل، نوار بالای برنامه را تشکیل می‌دهد؛ به ما امکان نام‌گذاری نقاشی و همچنین مدیریت ورودی و خروجی گرفتن آن را با استفاده از JSON می‌دهد.

- ورودی‌های Header tag:

این تگ، propهای مربوط به خودش را دارد که شامل نام نقاشی، تابع نام‌گذاری نقاشی، و توابع ورودی و خروجی گرفتن نقاشی به فرمت JSON می‌باشد.

<br>


```html
interface HeaderProps {
  drawingName: string;
  setDrawingName: (name: string) => void;
  exportJSON: () => void;
  importJSON: (file: File) => void;
}
```

یک تگ <input> داریم که مقدارش از drawingName Props می‌آید و روی هر تغییر رویداد setDrawingName را صدا می‌‌زند تا نام نقاشی به‌روز باشد.
<br>
برای دکمه‌ها یه بخش در نظر گرفته شده است. دکمه‌های Export و Import که با کلیک بر روی آن‌ها توابع مربوط بهشان صدا زده می‌شوند (تابع exportJSON که از App ارسال شده است و تابع handleImport که محتوا را می‌خواند و به importJSON می‌فرستد.

<br>


```html
  return (
    <header>
      <input className='title-input' value={drawingName} onChange={(e) => setDrawingName(e.target.value)}
        placeholder='Untitled Drawing' />

      <div className='actions'>
        <button onClick={exportJSON}>Export</button>
        <button onClick={triggerFilePicker}>Import</button>

        <input ref={fileInput} type='file' accept='application/json' style={{ display: 'none' }} onChange={handleImport}/>
      </div>
    </header>
  );
```




### Sidebar.tsx

این فایل نقش نوار ابزار در سمت راست را دارد که دارای سه شکل دایره، مربع و مثلث است. می‌توان این شکل‌ها را انتخاب کرد و در بوم قرار داد.

- ورودی‌های Sidebar tag:
این تگ propsای که دارد selectedShape می‌باشد که شکل انتخاب‌شده فعلی را نشان می‌دهد و با هر بار تغییر setSelectedShape را صدا می‌زند. این ورودی‌ها از فایل App.tsx می‌آیند.
با کلیک بر روی هر شکل، تابع setSelectedShape صدا زده می‌شود تا شکل انتخابی در بالادست ذخیره شود.

```html
interface SidebarProps {
  setSelectedShape: (type: ShapeType) => void;
  selectedShape: ShapeType | null;
}
```

- رویداد Drag and Drop:
در رویداد onDragStart روی هر شکل، نوع شکل در dataTransfer ذخیره می‌شود تا Canvas هنگام رها شدن بتواند آن را بخواند و شکل مناسب را بسازد.

```html
  const tools: ShapeType[] = ['circle', 'square', 'triangle'];

  const onDragStart = (e: React.DragEvent, type: ShapeType) => {
    e.dataTransfer.setData('shape', type);
  };
```

- ابزارها (Tools):

سه <div className='tool-item'> داریم که داخل هر کدام از آن‌ها از Shape Component استفاده شده است. همچنین هر آیتم draggable می‌باشد.

```html
  return (
    <div className='tools-section'>
      <div className='tools-label'>Tools</div>
      {tools.map((type) => (
        <div key={type} draggable onClick={() => setSelectedShape(type)} onDragStart={(e) => onDragStart(e, type)} 
          style={{ cursor: 'pointer', padding: '8px', margin: '4px 0', background: selectedShape === type ? '#e0e0e0' : undefined}}>
          <Shape type={type} />
        </div>
      ))}
    </div>
  );
```

### Canvas.tsx

این فایل همان بوم اصلی برنامه می‌باشد که وظیفه افزودن، حذف کردن و نمایش دادن اشکال را دارد و همچنین مقصد drag کردن اشکال نیز می‌باشد.

- Props:
این تگ Propsهای زیر را دارد:
```html
interface CanvasProps {
  shapes: ShapeData[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeData[]>>;
  selectedShape: ShapeType | null;
}
```

آرایه shapes، تابع به‌روزرسانی این آرایه (setShapes) و شکل انتخاب‌شده فعلی (selectedShape). این Propsها از فایل App.tsx به این فایل می‌آیند.

- افزودن شکل با کلیک:

رویداد onClick ابتدا مطمئن می‌شود کلیک واقعاً یک کلیک تکی است (e.detail === 1) و ابزار انتخاب شده وجود دارد؛ سپس با اختلاف مختصات موس و لبهٔ بوم (getBoundingClientRect) مختصات x, y را می‌سازد و شیء جدید را به آرایهٔ ‌shapes اضافه می‌کند.
```html
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.detail !== 1 || !selectedShape || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setShapes(prev => [
      ...prev, {
        type: selectedShape,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    ]);
  };
```

- حذف کردن شکل با دوبار کلیک:

هر شکل داخل یک <div> موقعیت‌دهی مطلق دارد. در رویداد onDoubleClick روی آن div، با e.stopPropagation() از رسیدن رویداد به بوم جلوگیری می‌شود و سپس فیلتر کردن آرایه اجرا می‌شود تا عنصر مربوطه کنار گذاشته شود.
کلیک روی شکل با e.stopPropagation() مانع از ایجاد شکل جدید در زیر آن می‌شود.

```html
  const handleShapeDoubleClick = (index: number) => {
    setShapes(prev => prev.filter((_, i) => i !== index));
  };
```
```html
<div key={i} style={{ position: 'absolute', left: shape.x, top: shape.y, transform: 'translate(-50%, 50%)', cursor: 'pointer' }}
          onClick={(e) => e.stopPropagation()} 
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleShapeDoubleClick(i);
        }}>
          <Shape type={shape.type} x={0} y={0} />
        </div>
```


- کشیدن (Drag and Drop):

رویداد onDragStart فقط e.preventDefault() را صدا می‌زند تا بوم مقصد معتبر شود. در onDrop نوع شکل از e.dataTransfer.getData('shape') خوانده‌ می‌شود؛ مختصات دقیق مثل کلیک محاسبه شده و شیء جدید به آرایه افزوده می‌شود.

```html
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const type = e.dataTransfer.getData('shape') as ShapeType;
    if (!type) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes(prev => [...prev, { type, x, y }]);
  };
```


- نمایش اشکال:

برای هر آیتم در shapes یک div با position: absolute رندر می‌شود تا دقیقا روی مختصات ذخیره‌شده قرار گیرد. داخل آن div، یک shape component با type مناسب رندر می‌شود.


```html
  return (
    <div className='canvas' ref={canvasRef} onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop}
         style={{ position: 'relative', width: '100%', height: '100%' }}>
      {shapes.map((shape, i) => (
        <div key={i} style={{ position: 'absolute', left: shape.x, top: shape.y, transform: 'translate(-50%, 50%)', cursor: 'pointer' }}
          onClick={(e) => e.stopPropagation()} 
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleShapeDoubleClick(i);
        }}>
          <Shape type={shape.type} x={0} y={0} />
        </div>
      ))}
    </div>
  );
```


### Footer.tsx
وظیفه اصلی این بخش نمایش لحظه‌ای تعداد هر نوع از اشکال می‌باشد که در بوم وجود دارند.

این تگ Props دریافتی‌اش آرایه shapes می‌باشد که آرایه‌ای از تمامی اشکال موجود می‌باشد و از App.tsx ورودی گرفته می‌شود.

```html
interface FooterProps {
  shapes: ShapeData[];
}
```


برای شمارش هر نوع شکل از Array.filter استفاده می‌شود و آرایه پیمایش می‌شود.

```html
  const circleCount = shapes.filter(s => s.type === 'circle').length;
  const squareCount = shapes.filter(s => s.type === 'square').length;
  const triangleCount = shapes.filter(s => s.type === 'triangle').length;
```

در نهایت یک div سه بخشی خواهیم داشت که تعداد اشکال مختلف را به ما نشان می‌دهد.

```html
  return (
    <div className='shape-counts'>
      <div className='shape-count'><Shape type='circle' /> {circleCount}</div>
      <div className='shape-count'><Shape type='square' /> {squareCount}</div>
      <div className='shape-count'><Shape type='triangle' /> {triangleCount}</div>
    </div>
  );
```


### Shape.tsx

هدف تولید یک component بدون حالت برای رندر کردن SVG Icon سه شکل پایه دایره، مربع و مثلث می‌باشد.
این تگ propsهایش به صورت زیر می‌باشند:
```html
export interface ShapeData {
  type: ShapeType;
  x: number;
  y: number;
}

interface ShapeProps {
  type: ShapeType;
  size?: number;
  className?: string;
  x?: number;
  y?: number;
  style?: React.CSSProperties;
}
```

- مدل (type) که نوع شکل را مشخص می‌کند.
- اندازه (size) که به صورت پیش‌فرض 40px در نظر گرفته شده.
- مختصات x و y: اگر داده شوند، کامپوننت را داخل یک <div> با position: absolute قرار می‌دهد تا وسط شکل دقیقاً در مختصات دلخواه باشد.
- نام کلاس و استایل:‌ برای استایل‌دهی در بیرون.


رندر کردن:
با یک switch case سه خروجی مجزا ساخته می‌شود: دایره با مرکز وسط SVG و شعاع size/2-2؛ مربع با فاصله 2px از تا خط حاشیه؛ مثلث.

```html
  switch (type) {
    case 'circle':
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <circle cx={size/2} cy={size/2} r={size/2 - 2} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    case 'square':
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <rect x={2} y={2} width={size-4} height={size-4} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    case 'triangle':
      const points = `${size/2},2 2,${size-2} ${size-2},${size-2}`;
      return (
        <div style={wrapperStyle}>
          <svg width={size} height={size} className={className} style={style}>
            <polygon points={points} stroke='black' strokeWidth='2' fill='white' />
          </svg>
        </div>
      );
    default:
      return null;
  }
```

## Back-end

### DrawingController.java

در این کلاس با استفاده از RestController Annotation، کلاس DrawingController را به عنوان پایانه REST خود تعریف می‌کنیم. این کلاس دارای دو تابع مهم برای ذخیره‌سازی و دریافت نقاشی‌ها می‌باشد که در ادامه آن‌ها را مشاهده می‌کنیم.

```html
@RestController
@RequestMapping("/api/drawings")
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController
```

- ذخیره‌سازی نقاشی:

```html
    @PostMapping(value = "/{username}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveDrawing(@PathVariable String username, @RequestBody String content) {
        try {
            drawingService.saveDrawing(username, content);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
```

این تابع مقادیر username و content را به ترتیب از URL و بدنه درخواست (به فرمت JSON) دریافت می‌کند و برای username داده‌شده، نقاشی را به شکل JSON از طریق لایه سرویس در database ذخیره می‌کند.

- دریافت نقاشی:

```html
    @GetMapping(value = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getDrawing(@PathVariable String username) {
        try {
            String content = drawingService.getDrawing(username);
            return content != null ? ResponseEntity.ok(content) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
```

این تابع مقدار username را از URL دریافت می‌کند و نقاشی آن کاربر را به ما برمی‌گرداند (در صورت نبود نقاشی null برگردانده می‌شود).



### DrawingService.java

این کلاس نماینده لایه سرویس می‌باشد.

```html
@Service
public class DrawingService
```

این کلاس شامل دو تابع جهت ذخیره‌سازی و دریافت نقاشی‌ها از database می‌باشد.

- تابع ذخیره‌سازی:

```html
    @Transactional
    public void saveDrawing(String username, String content) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            user = new User(username);
            userRepository.save(user);
        }

        Drawing drawing = drawingRepository.findByUser(user);
        if (drawing == null)
            drawing = new Drawing(user, content);
        else
            drawing.setContent(content);
        drawingRepository.save(drawing);
    }
```

این تابع به صورت یک تراکنش در database انجام می‌شود. این به این معناست که رشته‌ای از دستورات پشت سر هم انجام می‌شوند و در صورت شکست و انجام نشدن هر یک از آن‌ها کل فرایند متوقف شده و تاثیرات دستورات قبلی خنثی می‌شوند. این تابع در ابتدا کاربر مدنظر را پیدا می‌کند و در صورت نبود کاربر با نام‌کابری username، یک کاربر با آن نام‌کاربری می‌سازد و در database ذخیره می‌کند. در ادامه نقاشی کاربر مذکور از database دریافت می‌شود و محتوای آن با محتوای داده‌شده جابه‌جا می‌شود(در صورت نبود نقاشی برای آن کاربر یک نقاشی جدید با محتوای داده‌شده ساخته می‌شود).

- تابع دریافت:

```html
    @Transactional
    public String getDrawing(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }

        Drawing drawing = drawingRepository.findByUser(user);
        return drawing != null ? drawing.getContent() : null;
    }
}
```

این تابع هم به صورت یک تراکنش در database انجام می‌شود. در ابتدا سعی در یافتن کاربر مدنظر انجام می‌دهیم و در صورت نبود نام‌کاربری داده‌شده در database، عبارت null برگردانده می‌شود. در صورتی که کاربر پیدا شد، نقاشی مربوط به کاربر را از database دریافت کرده و آن را برمی‌گردانیم.

### User.java

این کلاس مربوط به کاربرهایی می‌باشد که از برنامه استفاده می‌کنند. کاربران به صورت JPA Entity ساخته می‌شوند (با استفاده از Entity Annotation). همچنین برای کاربران در database یک جدول با نام users ساخته می‌شود.

```html
@Entity
@Table(name = "users")
public class User
```

برای کاربران یک عدد id ساخته می‌شود که در صورت ایجاد کاربران جدید به صورت افزایشی به آن‌ها اختصاص داده می‌شود. هر کاربر یک نام‌کاربری خاص دارد که نمی‌تواند خالی باشد. همچنین هر کاربر تنها یک نقاشی می‌تواند داشته باشد (و هر نقاشی تنها یک کاربر دارد):

```html
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Drawing drawing;
```


### Drawing.java

این کلاس مربوط به نقاشی‌هایی می‌باشد که کاربران می‌سازند. این نقاشی‌ها هم به صورت JPA Entity ساخته می‌شوند و جدول مربوط به آن‌ها در database با نام drawing ساخته می‌شود.

```html
@Entity
public class Drawing
```

هر نقاشی مانند کاربران یک id خاص دارد. نقاشی‌ها دارای یک محتوای بزرگ به فرمت JSON هستند. همچنین نقاشی‌ها یک کلید خارجی به جدول کاربران دارند که تنها به یک کاربر مربوط می‌شود.

```html
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
```


### UserRepository.java
### DrawingRepository.java

دو interface داریم که از کلاس JpaRepository ارث‌بری می‌کنند. این کلاس توابع findByUser(User user) و findByUsername(String username) را به طور خودکار پیاده‌سازی می‌کند و با استفاده از SQL با database ارتباط برقرار می‌کند. دستورات به صورت زیر خواهند بود:

```html
SELECT * FROM users WHERE username = ?
SELECT * FROM drawing WHERE user_id = ?
```

در ادامه پیاده‌سازی این دو interface را مشاهده می‌کنید:

```html
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
```

```html
public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    Drawing findByUser(User user);
}
```



### PaintApplication.java

این کلاس، کلاس اصلی اجرای برنامه Spring Boot می‌باشد. این کلاس شامل سه تابع مهم می‌باشد.


```html
    public static void main(String[] args) {
        SpringApplication.run(PaintApplication.class, args);
    }
```

این تابع برنامه را با گرفتن ورودی args اجرا می‌کند.



```html
    @Bean
    public CommandLineRunner initiateUsers(UserRepository userRepository) {
        return args -> {
            userRepository.save(new User("user1"));
            userRepository.save(new User("user2"));
            userRepository.save(new User("user3"));
        };
    }
```

این تابع سه کاربر را به صورت پیش‌فرض در database قرار می‌دهد و این کار در لحظه‌ای که برنامه اجرا شد انجام می‌شود.

```html
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
```

این تابع به ما اجازه دسترسی به APIها از دامنه Front-end را می‌دهد. در ابتدا تنظیمات CORS برای تمامی مسیرهای زیر /api اعمال می‌شود. تنها به درخواست‌های ارسال‌شده از http://localhost:3000 پاسخ داده می‌شود. تنها مجاز به methodهای GET و POST می‌باشیم.















  
</div>
