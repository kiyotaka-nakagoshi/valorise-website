import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  RESEND_API_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// API route for contact form with email sending
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, organization, phone, message, type, language } = body

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Required fields are missing' }, 400)
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({ success: false, error: 'Invalid email format' }, 400)
    }

    // Log the submission
    console.log('Contact form submission:', { name, email, organization, phone, message, type, language })

    // Format email content
    const emailSubject = language === 'ja' 
      ? `【VALORISE】新規お問い合わせ - ${name}様`
      : `[VALORISE] New Inquiry - ${name}`
    
    const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALORISE フィジカル測定サービス
新規お問い合わせ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【お名前】
${name}

【メールアドレス】
${email}

【組織名】
${organization || '未記入'}

【電話番号】
${phone || '未記入'}

【お問い合わせ種別】
${type === 'team' ? 'チーム測定' : type === 'individual' ? '個人測定' : type === 'consultation' ? '相談・見積もり' : 'その他'}

【お問い合わせ内容】
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

    // Send email using Resend API (requires RESEND_API_KEY in environment)
    // To set up: wrangler secret put RESEND_API_KEY
    const resendApiKey = c.env?.RESEND_API_KEY
    
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'VALORISE Contact Form <onboarding@resend.dev>',
            to: ['nakagoshi@loopz.co.jp'],
            reply_to: email,
            subject: emailSubject,
            text: emailBody
          })
        })

        if (!resendResponse.ok) {
          console.error('Resend API error:', await resendResponse.text())
        } else {
          console.log('Email sent successfully via Resend')
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
      }
    } else {
      console.warn('RESEND_API_KEY not configured. Email not sent.')
      console.log('To enable email sending:')
      console.log('1. Sign up at https://resend.com')
      console.log('2. Get your API key')
      console.log('3. Run: wrangler secret put RESEND_API_KEY')
    }

    return c.json({ 
      success: true, 
      message: language === 'ja' 
        ? 'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。' 
        : 'Thank you for your inquiry. We will contact you soon.'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="VALORISE（ヴァロライズ）- 理学療法士・トレーナーの中越清登が提供する、競技力向上と怪我予防のためのフィジカル測定サービス。科学的データ分析で選手の可能性を最大化します。">
    <meta name="keywords" content="フィジカル測定,スポーツ科学,パフォーマンス向上,怪我予防,トレーニング,中越清登,VALORISE,ヴァロライズ">
    <title>VALORISE（ヴァロライズ）｜フィジカル測定サービス - あなたのフィジカルを"科学"する</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Noto Sans JP', 'Roboto', sans-serif;
        }
        
        .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .section-gradient {
            background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .smooth-scroll {
            scroll-behavior: smooth;
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
        }
        
        /* Language Toggle */
        .lang-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        /* Mobile: Move language toggle to left side to avoid menu button */
        @media (max-width: 768px) {
            .lang-toggle {
                top: 20px;
                left: 20px;
                right: auto;
            }
        }
        
        /* Navigation */
        nav {
            transition: all 0.3s ease;
        }
        
        nav.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* Auto-switching staff photos */
        .staff-photo-container {
            position: relative;
        }
        
        .staff-photo-container img {
            transition: opacity 1s ease-in-out;
        }
        
        .staff-photo-container img.photo-hidden {
            opacity: 0;
        }
        
        .staff-photo-container img.photo-visible {
            opacity: 1;
        }
        
        /* Data Science Hero Background */
        .hero-data-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            z-index: 0;
        }
        
        .data-point {
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(20px); }
        }
        
        .grid-line {
            position: absolute;
            background: rgba(255, 255, 255, 0.05);
        }
        
        .grid-line.horizontal {
            width: 100%;
            height: 1px;
        }
        
        .grid-line.vertical {
            width: 1px;
            height: 100%;
        }
        
        .stat-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .stat-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
        }
        
        .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        @keyframes pulse-ring {
            0% { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1.3); opacity: 0; }
        }
    </style>
</head>
<body class="smooth-scroll">
    
    <!-- Language Toggle -->
    <div class="lang-toggle">
        <button id="langToggle" class="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
            <i class="fas fa-globe mr-2"></i>
            <span id="currentLang">EN</span>
        </button>
    </div>

    <!-- Navigation -->
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
        <div class="container mx-auto px-6 flex justify-between items-center">
            <a href="#" class="flex items-center" id="logo">
                <img src="/static/images/valorise-logo-horizontal.png" alt="VALORISE" class="h-8 md:h-10 w-auto">
            </a>
            <div class="hidden md:flex space-x-6">
                <a href="#about" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
                <a href="#features" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="特徴" data-en="Features">特徴</a>
                <a href="#services" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
                <a href="#team" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a>
                <a href="#gallery" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="測定の様子" data-en="Gallery">測定の様子</a>
                <a href="#pricing" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a>
                <a href="#contact" class="text-white hover:text-gray-200 transition-colors nav-link" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
            </div>
            <button id="mobileMenuBtn" class="md:hidden text-white">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-white mt-4 py-4 px-6 rounded-lg shadow-lg mx-6">
            <a href="#about" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a>
            <a href="#features" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="特徴" data-en="Features">特徴</a>
            <a href="#services" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定項目" data-en="Services">測定項目</a>
            <a href="#team" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a>
            <a href="#gallery" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="測定の様子" data-en="Gallery">測定の様子</a>
            <a href="#pricing" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a>
            <a href="#contact" class="block py-2 text-gray-800 hover:text-purple-600 mobile-nav-link" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-gradient min-h-screen flex items-center justify-center text-white px-6 pt-20 relative overflow-hidden">
        <!-- Data Science Background -->
        <div class="hero-data-bg">
            <!-- Grid Lines -->
            <div class="grid-line horizontal" style="top: 20%;"></div>
            <div class="grid-line horizontal" style="top: 40%;"></div>
            <div class="grid-line horizontal" style="top: 60%;"></div>
            <div class="grid-line horizontal" style="top: 80%;"></div>
            <div class="grid-line vertical" style="left: 20%;"></div>
            <div class="grid-line vertical" style="left: 40%;"></div>
            <div class="grid-line vertical" style="left: 60%;"></div>
            <div class="grid-line vertical" style="left: 80%;"></div>
            
            <!-- Floating Data Points -->
            <div class="data-point" style="top: 15%; left: 10%; animation-delay: 0s;"></div>
            <div class="data-point" style="top: 25%; left: 85%; animation-delay: 1s;"></div>
            <div class="data-point" style="top: 45%; left: 15%; animation-delay: 2s;"></div>
            <div class="data-point" style="top: 65%; left: 90%; animation-delay: 3s;"></div>
            <div class="data-point" style="top: 75%; left: 25%; animation-delay: 1.5s;"></div>
            <div class="data-point" style="top: 85%; left: 70%; animation-delay: 2.5s;"></div>
            <div class="data-point" style="top: 30%; left: 50%; animation-delay: 0.5s;"></div>
            <div class="data-point" style="top: 55%; left: 60%; animation-delay: 3.5s;"></div>
        </div>
        
        <div class="container mx-auto text-center relative z-10">
            <div class="animate-fadeInUp">
                <!-- Logo in Hero -->
                <div class="mb-8" data-aos="fade-down">
                    <img src="/static/images/valorise-logo-vertical.png" alt="VALORISE" class="h-32 md:h-40 w-auto mx-auto">
                </div>
                <h1 class="text-5xl md:text-7xl font-bold mb-6" data-aos="fade-up">
                    <span id="heroTitle1" data-ja="あなたのフィジカルを" data-en="Transform Your Physical">あなたのフィジカルを</span><br>
                    <span id="heroTitle2" data-ja='"科学"する。' data-en='Performance with Science.'>"科学"する。</span>
                </h1>
                <p class="text-xl md:text-2xl mb-4" data-aos="fade-up" data-aos-delay="200">
                    <span id="heroSubtitle" data-ja="VALORISE フィジカル測定" data-en="VALORISE Physical Assessment">VALORISE フィジカル測定</span>
                </p>
                <p class="text-lg md:text-xl mb-8 opacity-90" data-aos="fade-up" data-aos-delay="400">
                    <span id="heroDescription" data-ja="トップアスリートも信頼する測定を、あなたに。" data-en="Trusted by top athletes worldwide.">トップアスリートも信頼する測定を、あなたに。</span>
                </p>
                
                <!-- Data Stats Cards -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="500">
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="92">0</span><span class="text-2xl">%</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat1" data-ja="リピート率" data-en="Repeat Rate">リピート率</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="1000">0</span><span class="text-2xl">+</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat2" data-ja="測定実績" data-en="Assessments">測定実績</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="24">0</span><span class="text-2xl">+</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat3" data-ja="測定項目" data-en="Parameters">測定項目</div>
                    </div>
                    <div class="stat-card rounded-xl p-4">
                        <div class="text-3xl md:text-4xl font-bold mb-1">
                            <span class="counter" data-target="6">0</span><span class="text-2xl">名</span>
                        </div>
                        <div class="text-xs md:text-sm opacity-80" id="stat4" data-ja="専門スタッフ" data-en="Specialists">専門スタッフ</div>
                    </div>
                </div>
                
                <div class="flex flex-col md:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="700">
                    <a href="#contact" class="btn-primary text-white px-8 py-4 rounded-full text-lg font-semibold inline-block">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span id="heroCTA1" data-ja="無料相談を予約" data-en="Book Free Consultation">無料相談を予約</span>
                    </a>
                    <a href="#about" class="bg-white text-purple-700 px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-gray-100 transition-all">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span id="heroCTA2" data-ja="詳しく見る" data-en="Learn More">詳しく見る</span>
                    </a>
                </div>
                <div class="mt-12 text-sm opacity-80" data-aos="fade-up" data-aos-delay="900">
                    <p id="heroCredentials" data-ja="理学療法士 × トレーナー × データサイエンス" data-en="Physical Therapist × Trainer × Data Science">理学療法士 × トレーナー × データサイエンス</p>
                    <p class="mt-2" id="heroFounder" data-ja="中越清登が提供する唯一無二のフィジカル測定サービス" data-en="Unique physical assessment service by Kiyoto Nakagoshi">中越清登が提供する唯一無二のフィジカル測定サービス</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="aboutTitle" data-ja="VALORISEとは" data-en="What is VALORISE">VALORISEとは</span>
                </h2>
                <p class="text-xl text-gray-600" id="aboutSubtitle" data-ja="測定を通じて、選手の可能性を可視化し、価値を最大化する" data-en="Visualize potential and maximize value through measurement">測定を通じて、選手の可能性を可視化し、価値を最大化する</p>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <div class="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg" data-aos="fade-up">
                    <p class="text-lg leading-relaxed mb-6" id="aboutText1" 
                       data-ja="VALORISE（ヴァロライズ）は、理学療法士・トレーナーの中越清登が開発した「競技力向上と怪我予防のためのフィジカル測定サービス」です。"
                       data-en="VALORISE is a comprehensive physical assessment service developed by physical therapist and trainer Kiyoto Nakagoshi for performance enhancement and injury prevention.">
                        VALORISE（ヴァロライズ）は、理学療法士・トレーナーの中越清登が開発した「競技力向上と怪我予防のためのフィジカル測定サービス」です。
                    </p>
                    <p class="text-lg leading-relaxed mb-6" id="aboutText2"
                       data-ja="単なる数値計測ではなく、スプリント・ジャンプ・パワー・左右差・動作特性などを科学的に解析し、競技パフォーマンスを決める根本要因を可視化します。"
                       data-en="Beyond simple measurements, we scientifically analyze sprint, jump, power, bilateral differences, and movement characteristics to visualize the fundamental factors that determine athletic performance.">
                        単なる数値計測ではなく、スプリント・ジャンプ・パワー・左右差・動作特性などを科学的に解析し、競技パフォーマンスを決める根本要因を可視化します。
                    </p>
                    <p class="text-xl font-semibold text-center text-purple-700 mt-8" id="aboutTagline"
                       data-ja="選手・チームが「伸びる理由」をつくる測定。それがVALORISEです。"
                       data-en='Creating the "reason to grow" for athletes and teams. That is VALORISE.'>
                        選手・チームが「伸びる理由」をつくる測定。それがVALORISEです。
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8 mt-12">
                    <div class="text-center" data-aos="fade-up" data-aos-delay="100">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-microscope text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission1Title" data-ja="科学的根拠" data-en="Scientific Evidence">科学的根拠</h3>
                        <p class="text-gray-600" id="mission1Text" data-ja="数千名以上のデータに基づく分析" data-en="Analysis based on thousands of athletes">数千名以上のデータに基づく分析</p>
                    </div>
                    <div class="text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-md text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission2Title" data-ja="専門性" data-en="Expertise">専門性</h3>
                        <p class="text-gray-600" id="mission2Text" data-ja="理学療法とトレーニングの融合" data-en="Fusion of therapy and training">理学療法とトレーニングの融合</p>
                    </div>
                    <div class="text-center" data-aos="fade-up" data-aos-delay="300">
                        <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-chart-line text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2" id="mission3Title" data-ja="実践的" data-en="Practical">実践的</h3>
                        <p class="text-gray-600" id="mission3Text" data-ja="即トレーニングに活かせる提案" data-en="Actionable training recommendations">即トレーニングに活かせる提案</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="featuresTitle" data-ja="VALORISE測定の8つの特徴" data-en="8 Unique Features">VALORISE測定の8つの特徴</span>
                </h2>
                <p class="text-xl text-gray-600" id="featuresSubtitle" data-ja="なぜVALORISEが選ばれるのか" data-en="Why VALORISE is chosen">なぜVALORISEが選ばれるのか</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-4xl mb-4">🔬</div>
                    <h3 class="text-xl font-bold mb-3" id="feature1Title" data-ja="中越式データ分析" data-en="Nakagoshi Method">中越式データ分析</h3>
                    <p class="text-gray-600" id="feature1Text" 
                       data-ja="数千名以上の経験から開発された独自の評価法。データから選手の未来を読み解きます。"
                       data-en="Unique evaluation method developed from thousands of cases. Reading the athlete's future from data.">
                        数千名以上の経験から開発された独自の評価法。データから選手の未来を読み解きます。
                    </p>
                </div>
                
                <!-- Feature 2 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="200">
                    <div class="text-4xl mb-4">📊</div>
                    <h3 class="text-xl font-bold mb-3" id="feature2Title" data-ja="一気通貫評価" data-en="Comprehensive Assessment">一気通貫評価</h3>
                    <p class="text-gray-600" id="feature2Text"
                       data-ja="スプリント、ジャンプ、パワー、可動域を総合的に評価。運動能力の根本を可視化します。"
                       data-en="Comprehensive evaluation of sprint, jump, power, and mobility. Visualizing the fundamentals of athletic ability.">
                        スプリント、ジャンプ、パワー、可動域を総合的に評価。運動能力の根本を可視化します。
                    </p>
                </div>
                
                <!-- Feature 3 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-4xl mb-4">🏃</div>
                    <h3 class="text-xl font-bold mb-3" id="feature3Title" data-ja="スプリント特性分析" data-en="Sprint Analysis">スプリント特性分析</h3>
                    <p class="text-gray-600" id="feature3Text"
                       data-ja="加速型・最高速型など、あなたの走りのタイプを明確化。改善ポイントが一目瞭然。"
                       data-en="Identify your sprint type - acceleration or max speed. Clear improvement points.">
                        加速型・最高速型など、あなたの走りのタイプを明確化。改善ポイントが一目瞭然。
                    </p>
                </div>
                
                <!-- Feature 4 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="400">
                    <div class="text-4xl mb-4">⚖️</div>
                    <h3 class="text-xl font-bold mb-3" id="feature4Title" data-ja="左右差の精密評価" data-en="Bilateral Assessment">左右差の精密評価</h3>
                    <p class="text-gray-600" id="feature4Text"
                       data-ja="RB・RDL・片脚動作から左右差を高精度で評価。怪我の大きな原因を特定します。"
                       data-en="Precise bilateral difference assessment through RB, RDL, and single-leg movements. Identify major injury causes.">
                        RB・RDL・片脚動作から左右差を高精度で評価。怪我の大きな原因を特定します。
                    </p>
                </div>
                
                <!-- Feature 5 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="500">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold mb-3" id="feature5Title" data-ja="VBTパワー分析" data-en="VBT Analysis">VBTパワー分析</h3>
                    <p class="text-gray-600" id="feature5Text"
                       data-ja="速度・加速度・パワー発揮のタイミングまで分析。実戦向けの強さを評価します。"
                       data-en="Analyze velocity, acceleration, and power timing. Evaluate practical strength.">
                        速度・加速度・パワー発揮のタイミングまで分析。実戦向けの強さを評価します。
                    </p>
                </div>
                
                <!-- Feature 6 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="600">
                    <div class="text-4xl mb-4">🛡️</div>
                    <h3 class="text-xl font-bold mb-3" id="feature6Title" data-ja="怪我予防分析" data-en="Injury Prevention">怪我予防分析</h3>
                    <p class="text-gray-600" id="feature6Text"
                       data-ja="怪我しやすい動作パターンを測定段階で見抜き、予防プランにつなげます。"
                       data-en="Identify injury-prone movement patterns and connect to prevention plans.">
                        怪我しやすい動作パターンを測定段階で見抜き、予防プランにつなげます。
                    </p>
                </div>
                
                <!-- Feature 7 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="700">
                    <div class="text-4xl mb-4">🎯</div>
                    <h3 class="text-xl font-bold mb-3" id="feature7Title" data-ja="ポジション別比較" data-en="Position Comparison">ポジション別比較</h3>
                    <p class="text-gray-600" id="feature7Text"
                       data-ja="競技・ポジション別にあなたの強み・弱みをランキング化。現在地を正確に把握。"
                       data-en="Rank your strengths and weaknesses by sport and position. Accurate positioning.">
                        競技・ポジション別にあなたの強み・弱みをランキング化。現在地を正確に把握。
                    </p>
                </div>
                
                <!-- Feature 8 -->
                <div class="bg-white rounded-xl p-6 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="800">
                    <div class="text-4xl mb-4">📝</div>
                    <h3 class="text-xl font-bold mb-3" id="feature8Title" data-ja="具体的行動指針" data-en="Action Plan">具体的行動指針</h3>
                    <p class="text-gray-600" id="feature8Text"
                       data-ja="測定後は「明日から何をやるか」が明確に。中越式フィードバックで成長への道筋を提示。"
                       data-en="Clear action plan from day one. Nakagoshi feedback shows the path to growth.">
                        測定後は「明日から何をやるか」が明確に。中越式フィードバックで成長への道筋を提示。
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Measurement Items Section -->
    <section id="services" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="servicesTitle" data-ja="測定項目" data-en="Measurement Items">測定項目</span>
                </h2>
                <p class="text-xl text-gray-600" id="servicesSubtitle" data-ja="競技パフォーマンスを決める全要素を網羅" data-en="Comprehensive assessment of performance factors">競技パフォーマンスを決める全要素を網羅</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- Sprint -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-running text-4xl text-blue-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service1Title" data-ja="スプリント測定" data-en="Sprint Assessment">スプリント測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="5m / 10m / 30m タイム測定" data-en="5m / 10m / 30m time measurement">5m / 10m / 30m タイム測定</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="加速力・最高速度の評価" data-en="Acceleration & max speed evaluation">加速力・最高速度の評価</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="スプリント特性の分析" data-en="Sprint characteristic analysis">スプリント特性の分析</span></li>
                        <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="ピーク速度・スタートの癖" data-en="Peak speed & start habits">ピーク速度・スタートの癖</span></li>
                    </ul>
                </div>
                
                <!-- Jump -->
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-arrow-up text-4xl text-green-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service2Title" data-ja="ジャンプ測定" data-en="Jump Assessment">ジャンプ測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="CMJ（カウンタームーブメントジャンプ）" data-en="CMJ (Counter Movement Jump)">CMJ（カウンタームーブメントジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="SCMJ（腕振りジャンプ）" data-en="SCMJ (Arm swing jump)">SCMJ（腕振りジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="RB（リバウンドジャンプ）" data-en="RB (Rebound jump)">RB（リバウンドジャンプ）</span></li>
                        <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="RSI・左右差の評価" data-en="RSI & bilateral difference">RSI・左右差の評価</span></li>
                    </ul>
                </div>
                
                <!-- Strength & Power -->
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-dumbbell text-4xl text-red-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service3Title" data-ja="筋力・パワー測定" data-en="Strength & Power">筋力・パワー測定</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="デッドリフト・スクワット" data-en="Deadlift & Squat">デッドリフト・スクワット</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="ベンチプレス・懸垂" data-en="Bench Press & Pull-up">ベンチプレス・懸垂</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="RDL30（片脚パワー）" data-en="RDL30 (Single leg power)">RDL30（片脚パワー）</span></li>
                        <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="プッシュプレス（VBT分析）" data-en="Push Press (VBT analysis)">プッシュプレス（VBT分析）</span></li>
                    </ul>
                </div>
                
                <!-- Mobility -->
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-child text-4xl text-purple-600 mr-4"></i>
                        <h3 class="text-2xl font-bold" id="service4Title" data-ja="可動域・柔軟性" data-en="Mobility & Flexibility">可動域・柔軟性</h3>
                    </div>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="肩関節可動域" data-en="Shoulder mobility">肩関節可動域</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="股関節可動域" data-en="Hip mobility">股関節可動域</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="ハムストリング柔軟性" data-en="Hamstring flexibility">ハムストリング柔軟性</span></li>
                        <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="動作連動性の評価" data-en="Movement coordination">動作連動性の評価</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="benefitsTitle" data-ja="VALORISE測定で得られる4つの価値" data-en="4 Key Benefits">VALORISE測定で得られる4つの価値</span>
                </h2>
                <p class="text-xl text-gray-600" id="benefitsSubtitle" data-ja="測定後の成長が変わる" data-en="Transform your growth journey">測定後の成長が変わる</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- Benefit 1 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up">
                    <div class="flex items-start">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-blue-600">01</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit1Title" data-ja="何を伸ばせばいいかが明確になる" data-en="Clear Development Direction">何を伸ばせばいいかが明確になる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit1Text"
                               data-ja="加速が弱いのか、中間速度が弱いのか、地面反力の出し方が悪いのか、左右差が大きいのか。プレーの課題が「原因レベル」でわかるため、トレーニング効率が劇的に上がります。"
                               data-en="Identify whether it's acceleration, mid-speed, ground reaction force, or bilateral differences. Understanding issues at the root cause level dramatically improves training efficiency.">
                                加速が弱いのか、中間速度が弱いのか、地面反力の出し方が悪いのか、左右差が大きいのか。プレーの課題が「原因レベル」でわかるため、トレーニング効率が劇的に上がります。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 2 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-start">
                        <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-green-600">02</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit2Title" data-ja="怪我しやすい理由が見える" data-en="Identify Injury Risks">怪我しやすい理由が見える</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit2Text"
                               data-ja="RB左右差、可動域不足、加速構造の崩れなど、怪我の根本要因をデータで把握。過去のフィジカルデータ比較から、怪我傾向を測定段階で見抜き、予防プランにつなげます。"
                               data-en="Identify root causes of injuries through RB bilateral differences, mobility limitations, and acceleration structure issues. Data-driven injury prevention planning.">
                                RB左右差、可動域不足、加速構造の崩れなど、怪我の根本要因をデータで把握。過去のフィジカルデータ比較から、怪我傾向を測定段階で見抜き、予防プランにつなげます。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 3 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-start">
                        <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-purple-600">03</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit3Title" data-ja="明日からのトレーニングが変わる" data-en="Transform Your Training">明日からのトレーニングが変わる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit3Text"
                               data-ja="目的別の「中越式トレーニング処方」を提供。優先すべきトレーニング、避けるべき動作、改善すべき左右差、競技力が上がるポイントが明確になります。効果が最短で出る方向性を提示します。"
                               data-en="Receive Nakagoshi's personalized training prescription. Clear priorities, movements to avoid, bilateral improvements, and performance enhancement points for fastest results.">
                                目的別の「中越式トレーニング処方」を提供。優先すべきトレーニング、避けるべき動作、改善すべき左右差、競技力が上がるポイントが明確になります。効果が最短で出る方向性を提示します。
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Benefit 4 -->
                <div class="bg-white rounded-2xl p-8 shadow-lg card-hover" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-start">
                        <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                            <span class="text-3xl font-bold text-red-600">04</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold mb-3" id="benefit4Title" data-ja="チーム強化の軸ができる" data-en="Team Enhancement Framework">チーム強化の軸ができる</h3>
                            <p class="text-gray-600 leading-relaxed" id="benefit4Text"
                               data-ja="ポジション別基準値の設定、年間計画の根拠づくり、データの共通言語化に最適。チームで測定すると、戦術とフィジカルを結びつける科学的基盤が構築できます。"
                               data-en="Establish position-specific benchmarks, evidence-based annual planning, and data-driven communication. Build a scientific foundation connecting tactics with physical capabilities.">
                                ポジション別基準値の設定、年間計画の根拠づくり、データの共通言語化に最適。チームで測定すると、戦術とフィジカルを結びつける科学的基盤が構築できます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Target Audience Section -->
    <section id="target" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="targetTitle" data-ja="こんな方におすすめ" data-en="Who Should Use VALORISE">こんな方におすすめ</span>
                </h2>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-md" data-aos="fade-up">
                    <i class="fas fa-chart-line text-3xl text-blue-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target1" data-ja="伸び悩んでいる原因を知りたい" data-en="Want to know why you're plateauing">伸び悩んでいる原因を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="100">
                    <i class="fas fa-heartbeat text-3xl text-green-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target2" data-ja="怪我しやすい理由を知りたい" data-en="Want to understand injury patterns">怪我しやすい理由を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="200">
                    <i class="fas fa-bolt text-3xl text-purple-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target3" data-ja="スプリントやジャンプを強化したい" data-en="Want to improve sprint and jump">スプリントやジャンプを強化したい</p>
                </div>
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="300">
                    <i class="fas fa-bullseye text-3xl text-red-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target4" data-ja="ポジション別の武器をつくりたい" data-en="Want position-specific strengths">ポジション別の武器をつくりたい</p>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="400">
                    <i class="fas fa-map-marked-alt text-3xl text-yellow-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target5" data-ja="競技レベルの中で自分の現在地を知りたい" data-en="Want to know your competitive level">競技レベルの中で自分の現在地を知りたい</p>
                </div>
                <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-md" data-aos="fade-up" data-aos-delay="500">
                    <i class="fas fa-users text-3xl text-indigo-600 mb-3"></i>
                    <p class="text-lg font-semibold" id="target6" data-ja="チームトレーニングの方向性を明確にしたい" data-en="Want clear team training direction">チームトレーニングの方向性を明確にしたい</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="py-20 bg-white">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="teamTitle" data-ja="VALORISE フィジカル測定チーム" data-en="VALORISE Measurement Team">VALORISE フィジカル測定チーム</span>
                </h2>
                <p class="text-xl text-gray-600" id="teamSubtitle" data-ja="6名体制の専門スタッフが測定をサポート" data-en="6-member professional team supports your assessment">6名体制の専門スタッフが測定をサポート</p>
                <p class="text-lg text-gray-500 mt-2" id="teamStructure" data-ja="統括 → リーダー → 専門スタッフの階層構造で最高品質を実現" data-en="Hierarchical structure: Director → Leader → Specialists for maximum quality">統括 → リーダー → 専門スタッフの階層構造で最高品質を実現</p>
            </div>
            
            <!-- Team Members -->
            <div class="max-w-7xl mx-auto space-y-8">
                
                <!-- 1. Director -->
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect (Business → Gym) -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/nakagoshi-business.jpg" 
                                 alt="中越清登 - Director (Business)" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/nakagoshi-gym.jpg" 
                                 alt="中越清登 - Director (Gym)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-purple-700 to-indigo-700 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                01
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team1Role" data-ja="VALORISE 統括ディレクター" data-en="Director">VALORISE 統括ディレクター</span>
                                <span class="text-purple-600 ml-2" id="team1Name" data-ja="（中越清登）" data-en="(Kiyoto Nakagoshi)">(中越清登)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team1Badge1" data-ja="全体統括" data-en="Overall Direction">全体統括</span>
                                <span class="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold" id="team1Badge2" data-ja="最終意思決定" data-en="Final Decision">最終意思決定</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team1Purpose" 
                               data-ja="VALORISEフィジカル測定事業全体の戦略策定・品質管理・対外窓口を担い、事業価値の最大化を図る。"
                               data-en="Responsible for overall strategy, quality control, and external relations of VALORISE physical assessment business to maximize business value.">
                                VALORISEフィジカル測定事業全体の戦略策定・品質管理・対外窓口を担い、事業価値の最大化を図る。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-purple-600 hover:text-purple-800" id="team1Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="測定事業の方向性・ビジョン策定" data-en="Business direction & vision">測定事業の方向性・ビジョン策定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="測定項目・基準値の最終決定" data-en="Final measurement standards">測定項目・基準値の最終決定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="学校・チーム・企業への営業・契約交渉" data-en="Sales & negotiations">学校・チーム・企業への営業・契約交渉</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="価格設定・見積作成の最終承認" data-en="Pricing approval">価格設定・見積作成の最終承認</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="スタッフ配置・報酬・年間スケジュール策定" data-en="Staff management">スタッフ配置・報酬・年間スケジュール策定</span></li>
                                    <li><i class="fas fa-check text-purple-600 mr-2"></i><span data-ja="メディア発信（SNS・YouTube・PR）の統括" data-en="Media management">メディア発信（SNS・YouTube・PR）の統括</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 2. Special Advisor -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect (Business → TV) -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/shibamura-business.jpg" 
                                 alt="柴村直弥 - Special Advisor (Business)" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/shibamura-tv.jpg" 
                                 alt="柴村直弥 - Special Advisor (TV)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-yellow-600 to-orange-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                02
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team2Role" data-ja="特別アドバイザー" data-en="Special Advisor">特別アドバイザー</span>
                                <span class="text-orange-600 ml-2" id="team2Name" data-ja="（柴村直弥）" data-en="(Naoya Shibamura)">(柴村直弥)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team2Badge1" data-ja="技術助言" data-en="Technical Advice">技術助言</span>
                                <span class="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold" id="team2Badge2" data-ja="プロアスリート視点" data-en="Pro Athlete">プロアスリート視点</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team2Purpose"
                               data-ja="プロアスリート視点から測定内容の改善・品質向上に寄与し、VALORISEのブランド価値向上に貢献する。"
                               data-en="Contributes to improving measurement content and quality from a professional athlete's perspective, enhancing VALORISE's brand value.">
                                プロアスリート視点から測定内容の改善・品質向上に寄与し、VALORISEのブランド価値向上に貢献する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-orange-600 hover:text-orange-800" id="team2Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="測定項目・評価基準への助言" data-en="Measurement advice">測定項目・評価基準への助言</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="現場での技術・動作分析アドバイス" data-en="Technical analysis">現場での技術・動作分析アドバイス</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="チームの測定精度向上へのサポート" data-en="Quality improvement">チームの測定精度向上へのサポート</span></li>
                                    <li><i class="fas fa-check text-orange-600 mr-2"></i><span data-ja="PR・SNS協力（出演・コメント）" data-en="PR cooperation">PR・SNS協力（出演・コメント）</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 3. Team Leader (Measurement & Integration Lead) -->
                <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/urishima-color.jpg" 
                                 alt="瓜島大洋 - Team Leader" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/urishima-bw.jpg" 
                                 alt="瓜島大洋 - Team Leader (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-teal-600 to-cyan-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                03
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team3Role" data-ja="チームリーダー（測定・解析統合責任者）" data-en="Measurement & Integration Lead">チームリーダー（測定・解析統合責任者）</span>
                                <span class="text-teal-600 ml-2" id="team3Name" data-ja="（瓜島大洋）" data-en="(Taiyo Urishima)">(瓜島大洋)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team3Badge1" data-ja="現場統括" data-en="Field Leadership">現場統括</span>
                                <span class="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold" id="team3Badge2" data-ja="統合調整" data-en="Integration">統合調整</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team3Purpose"
                               data-ja="測定現場・技術・データ・人を統合し、チーム全体のパフォーマンスを最大化する中核的リーダー。"
                               data-en="Core leader who integrates field operations, technology, data, and people to maximize team performance.">
                                測定現場・技術・データ・人を統合し、チーム全体のパフォーマンスを最大化する中核的リーダー。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-teal-600 hover:text-teal-800" id="team3Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="測定当日の現場進行管理・タイムスケジュール調整" data-en="On-site progress management">測定当日の現場進行管理・タイムスケジュール調整</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="中越不在時の現場責任者としての判断" data-en="Acting director decisions">中越不在時の現場責任者としての判断</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="フィールドオペレーターへの指示・役割分担" data-en="Staff direction">フィールドオペレーターへの指示・役割分担</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="テクニカル × データの統合・連携調整" data-en="Technical-data integration">テクニカル × データの統合・連携調整</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="クライアントへの一次対応・簡易説明" data-en="Client communication">クライアントへの一次対応・簡易説明</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="測定中の判断（再測定・除外・補足）" data-en="Measurement decisions">測定中の判断（再測定・除外・補足）</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="チーム育成・内部改善提案" data-en="Team development">チーム育成・内部改善提案</span></li>
                                    <li><i class="fas fa-check text-teal-600 mr-2"></i><span data-ja="測定現場の安全管理・トラブル一次対応" data-en="Safety management">測定現場の安全管理・トラブル一次対応</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 4. Technical Lead -->
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/kitahara-color.jpg" 
                                 alt="北原寛也 - Technical Lead" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/kitahara-bw.jpg" 
                                 alt="北原寛也 - Technical Lead (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                04
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team4Role" data-ja="テクニカルリード" data-en="Technical Lead">テクニカルリード</span>
                                <span class="text-blue-600 ml-2" id="team4Name" data-ja="（北原寛也）" data-en="(Hiroya Kitahara)">(北原寛也)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team4Badge1" data-ja="技術責任" data-en="Technical Lead">技術責任</span>
                                <span class="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold" id="team4Badge2" data-ja="測定精度" data-en="Measurement Accuracy">測定精度</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team4Purpose"
                               data-ja="現場での測定技術の最高責任者として、精度・効率・安全性を担保する。"
                               data-en="As the chief technical officer on-site, ensures accuracy, efficiency, and safety.">
                                現場での測定技術の最高責任者として、精度・効率・安全性を担保する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-blue-600 hover:text-blue-800" id="team4Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="光電管・VBT・ジャンプ測定の実施" data-en="Measurement execution">光電管・VBT・ジャンプ測定の実施</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="測定導線の設計・配置管理" data-en="Setup design">測定導線の設計・配置管理</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="オペレーターへの技術教育" data-en="Staff training">オペレーターへの技術教育</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="デバイスのセットアップ・点検" data-en="Device management">デバイスのセットアップ・点検</span></li>
                                    <li><i class="fas fa-check text-blue-600 mr-2"></i><span data-ja="チームリーダーとの測定品質連携" data-en="Quality coordination with leader">チームリーダーとの測定品質連携</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 5. Data Manager -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="400">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo with Hover Effect -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/nemoto-color.jpg" 
                                 alt="根本大洋 - Data Manager" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/nemoto-bw.jpg" 
                                 alt="根本大洋 - Data Manager (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-green-700 to-emerald-700 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                05
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team5Role" data-ja="データマネージャー" data-en="Data Manager">データマネージャー</span>
                                <span class="text-green-600 ml-2" id="team5Name" data-ja="（根本大洋）" data-en="(Taiyo Nemoto)">(根本大洋)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team5Badge1" data-ja="解析" data-en="Analysis">解析</span>
                                <span class="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold" id="team5Badge2" data-ja="データ管理" data-en="Data Management">データ管理</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team5Purpose"
                               data-ja="測定データの正確な管理・整理・分析を行い、レポート作成までの工程を一元管理する。"
                               data-en="Manages accurate data processing, organization, and analysis, overseeing the entire report creation process.">
                                測定データの正確な管理・整理・分析を行い、レポート作成までの工程を一元管理する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-green-600 hover:text-green-800" id="team5Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="Excelへのデータ入力・チェック" data-en="Data entry">Excelへのデータ入力・チェック</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="左右差・偏差値・基準値との比較" data-en="Comparative analysis">左右差・偏差値・基準値との比較</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="個別フィードバック資料の作成" data-en="Report creation">個別フィードバック資料の作成</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="チーム向け総括資料の作成" data-en="Team report">チーム向け総括資料の作成</span></li>
                                    <li><i class="fas fa-check text-green-600 mr-2"></i><span data-ja="チームリーダーとのデータ連携" data-en="Data coordination with leader">チームリーダーとのデータ連携</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- 6. Field Operator -->
                <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="500">
                    <div class="flex items-start space-x-6">
                        <!-- Staff Photo -->
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 group staff-photo-container">
                            <img src="/static/images/team/fujimori-color.jpg" 
                                 alt="藤森颯 - Field Operator" 
                                 class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0">
                            <img src="/static/images/team/fujimori-bw.jpg" 
                                 alt="藤森颯 - Field Operator (B&W)" 
                                 class="absolute inset-0 w-full h-full object-cover">
                            <div class="absolute bottom-0 right-0 bg-gradient-to-br from-red-600 to-pink-600 text-white w-10 h-10 rounded-tl-2xl flex items-center justify-center text-sm font-bold">
                                06
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold mb-2">
                                <span id="team6Role" data-ja="フィールドオペレーター" data-en="Field Operator">フィールドオペレーター</span>
                                <span class="text-red-600 ml-2" id="team6Name" data-ja="（藤森颯）" data-en="(Hayate Fujimori)">(藤森颯)</span>
                            </h3>
                            <div class="mb-4">
                                <span class="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mr-2" id="team6Badge1" data-ja="計測担当" data-en="Measurement">計測担当</span>
                                <span class="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold" id="team6Badge2" data-ja="現場サポート" data-en="Field Support">現場サポート</span>
                            </div>
                            <p class="text-gray-700 mb-4" id="team6Purpose"
                               data-ja="現場でのスプリント・ジャンプ・可動域測定を担当し、円滑で安全な測定運営に貢献する。"
                               data-en="Responsible for sprint, jump, and mobility measurements on-site, contributing to smooth and safe operations.">
                                現場でのスプリント・ジャンプ・可動域測定を担当し、円滑で安全な測定運営に貢献する。
                            </p>
                            <details class="cursor-pointer">
                                <summary class="font-semibold text-red-600 hover:text-red-800" id="team6Details" data-ja="主な業務範囲を見る" data-en="View Responsibilities">主な業務範囲を見る</summary>
                                <ul class="mt-3 space-y-2 text-sm text-gray-600 ml-4">
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="スプリント測定の誘導・サポート" data-en="Sprint support">スプリント測定の誘導・サポート</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="ジャンプ測定（CMJ/SCMJ/RB）の実施" data-en="Jump measurement">ジャンプ測定（CMJ/SCMJ/RB）の実施</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="可動域チェック（肩・股関節）" data-en="Mobility check">可動域チェック（肩・股関節）</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="測定の順番管理・選手誘導" data-en="Flow management">測定の順番管理・選手誘導</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="荷物・備品の搬入搬出" data-en="Equipment setup">荷物・備品の搬入搬出</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="測定環境の安全確保" data-en="Safety management">測定環境の安全確保</span></li>
                                    <li><i class="fas fa-check text-red-600 mr-2"></i><span data-ja="チームリーダーの指示に従った業務遂行" data-en="Following leader's instructions">チームリーダーの指示に従った業務遂行</span></li>
                                </ul>
                            </details>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Team Balance Chart -->
            <div class="mt-16 max-w-5xl mx-auto" data-aos="fade-up">
                <h3 class="text-2xl font-bold text-center mb-8">
                    <span id="teamBalanceTitle" data-ja="6名体制の役割バランス" data-en="6-Member Team Role Balance">6名体制の役割バランス</span>
                </h3>
                <div class="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b-2 border-gray-300">
                                <th class="p-3 text-left font-bold" id="tableRole" data-ja="役職" data-en="Role">役職</th>
                                <th class="p-3 text-center font-bold" id="tableFocus" data-ja="役割の重心" data-en="Focus">役割の重心</th>
                                <th class="p-3 text-center font-bold" id="tableField" data-ja="現場" data-en="Field">現場</th>
                                <th class="p-3 text-center font-bold" id="tableData" data-ja="データ" data-en="Data">データ</th>
                                <th class="p-3 text-center font-bold" id="tableBusiness" data-ja="営業・戦略" data-en="Business">営業・戦略</th>
                                <th class="p-3 text-center font-bold" id="tableIntegration" data-ja="統合調整" data-en="Integration">統合調整</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="中越" data-en="Nakagoshi">中越</span></td>
                                <td class="p-3"><span data-ja="全体統括" data-en="Overall Direction">全体統括</span></td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">○</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="柴村" data-en="Shibamura">柴村</span></td>
                                <td class="p-3"><span data-ja="技術助言" data-en="Technical Advice">技術助言</span></td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-teal-50">
                                <td class="p-3 font-bold"><span data-ja="瓜島（リーダー）" data-en="Urishima (Leader)">瓜島（リーダー）</span></td>
                                <td class="p-3"><span data-ja="現場統括・統合" data-en="Field Leadership">現場統括・統合</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">○</td>
                                <td class="p-3 text-center">◎</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="北原（テクニカル）" data-en="Kitahara (Technical)">北原（テクニカル）</span></td>
                                <td class="p-3"><span data-ja="技術責任" data-en="Technical">技術責任</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="p-3"><span data-ja="根本（データ）" data-en="Nemoto (Data)">根本（データ）</span></td>
                                <td class="p-3"><span data-ja="解析" data-en="Analysis">解析</span></td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                            <tr>
                                <td class="p-3"><span data-ja="藤森（オペレーター）" data-en="Fujimori (Operator)">藤森（オペレーター）</span></td>
                                <td class="p-3"><span data-ja="計測担当" data-en="Measurement">計測担当</span></td>
                                <td class="p-3 text-center">◎</td>
                                <td class="p-3 text-center">△</td>
                                <td class="p-3 text-center">－</td>
                                <td class="p-3 text-center">△</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-4 text-xs text-gray-500 text-center">
                        <span data-ja="◎ = 主担当 / ○ = 関与大 / △ = 関与小 / － = なし" data-en="◎ = Primary / ○ = High / △ = Low / － = None">◎ = 主担当 / ○ = 関与大 / △ = 関与小 / － = なし</span>
                        <br>
                        <span class="text-teal-600 font-semibold mt-2 inline-block" data-ja="※ チームリーダーは測定現場・技術・データを統合する中核的役割" data-en="※ Team Leader integrates field, technical, and data aspects">※ チームリーダーは測定現場・技術・データを統合する中核的役割</span>
                    </div>
                </div>
            </div>

            <!-- Team Strength -->
            <div class="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center" data-aos="fade-up">
                <h3 class="text-2xl font-bold mb-4">
                    <span id="teamStrengthTitle" data-ja="6名体制の強み" data-en="Team Strengths">6名体制の強み</span>
                </h3>
                <p class="text-gray-600 mb-6" data-ja="チームリーダーを中心とした階層構造で、現場品質を最大化" data-en="Hierarchical structure with Team Leader for maximum quality">チームリーダーを中心とした階層構造で、現場品質を最大化</p>
                <div class="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <div class="text-4xl mb-2">🎯</div>
                        <h4 class="font-bold mb-2" id="strength1Title" data-ja="統合されたリーダーシップ" data-en="Integrated Leadership">統合されたリーダーシップ</h4>
                        <p class="text-sm text-gray-600" id="strength1Text" data-ja="チームリーダーが現場・技術・データを統合管理" data-en="Team Leader integrates field, technical, and data">チームリーダーが現場・技術・データを統合管理</p>
                    </div>
                    <div>
                        <div class="text-4xl mb-2">⚡</div>
                        <h4 class="font-bold mb-2" id="strength2Title" data-ja="効率的な運営" data-en="Efficiency">効率的な運営</h4>
                        <p class="text-sm text-gray-600" id="strength2Text" data-ja="明確な役割分担と指揮系統で円滑な測定進行" data-en="Smooth operations through clear hierarchy">明確な役割分担と指揮系統で円滑な測定進行</p>
                    </div>
                    <div>
                        <div class="text-4xl mb-2">📊</div>
                        <h4 class="font-bold mb-2" id="strength3Title" data-ja="質の高い分析" data-en="Quality">質の高い分析</h4>
                        <p class="text-sm text-gray-600" id="strength3Text" data-ja="測定から実践まで一貫したサポート体制" data-en="Comprehensive support from measurement to practice">測定から実践まで一貫したサポート体制</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="galleryTitle" data-ja="測定現場の様子" data-en="Measurement Gallery">測定現場の様子</span>
                </h2>
                <p class="text-xl text-gray-600" id="gallerySubtitle" data-ja="プロフェッショナルな測定環境と実際の測定風景" data-en="Professional measurement environment and actual scenes">プロフェッショナルな測定環境と実際の測定風景</p>
            </div>

            <!-- Gallery Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <!-- Gallery Item 1 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-01.jpg" 
                         alt="ジャンプ測定の様子" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="ジャンプ測定" data-en="Jump Measurement">ジャンプ測定</p>
                    </div>
                </div>

                <!-- Gallery Item 2 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <img src="/static/images/gallery/measurement-02.jpg" 
                         alt="パワー測定の様子" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="パワー測定" data-en="Power Measurement">パワー測定</p>
                    </div>
                </div>

                <!-- Gallery Item 3 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <img src="/static/images/gallery/measurement-03.jpg" 
                         alt="チーム測定指導" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="チーム測定指導" data-en="Team Measurement">チーム測定指導</p>
                    </div>
                </div>

                <!-- Gallery Item 4 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-04.jpg" 
                         alt="データ収集" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="データ収集" data-en="Data Collection">データ収集</p>
                    </div>
                </div>

                <!-- Gallery Item 5 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                    <img src="/static/images/gallery/measurement-05.jpg" 
                         alt="スプリント測定環境" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="スプリント測定環境" data-en="Sprint Measurement">スプリント測定環境</p>
                    </div>
                </div>

                <!-- Gallery Item 6 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                    <img src="/static/images/gallery/measurement-06.jpg" 
                         alt="室内トレーニング施設" 
                         class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p class="text-white font-semibold" data-ja="室内トレーニング施設" data-en="Indoor Facility">室内トレーニング施設</p>
                    </div>
                </div>

                <!-- Gallery Item 7 -->
                <div class="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-3" data-aos="fade-up">
                    <img src="/static/images/gallery/measurement-07.jpg" 
                         alt="野球チーム測定" 
                         class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                            <p class="text-white font-semibold text-xl mb-2" data-ja="野球チーム測定" data-en="Baseball Team Measurement">野球チーム測定</p>
                            <p class="text-gray-200 text-sm" data-ja="プロフェッショナルな測定環境でチーム全体をサポート" data-en="Supporting entire teams in professional measurement environment">プロフェッショナルな測定環境でチーム全体をサポート</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="section-gradient py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="pricingTitle" data-ja="料金プラン" data-en="Pricing Plans">料金プラン</span>
                </h2>
                <p class="text-xl text-gray-600" id="pricingSubtitle" data-ja="ニーズに合わせた4つのプラン" data-en="Four plans to fit your needs">ニーズに合わせた4つのプラン</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <!-- Entry Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan1Title" data-ja="VALORISE Entry" data-en="VALORISE Entry">VALORISE Entry</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan1Subtitle" data-ja="お試しプラン" data-en="Trial Plan">お試しプラン</p>
                        <div class="text-4xl font-bold text-purple-600">
                            ¥165,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan1Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-gray-500 mt-1" id="plan1Capacity" data-ja="20名まで" data-en="Up to 20 people">20名まで</p>
                        <p class="text-xs text-gray-500" id="plan1Extra" data-ja="追加1名：+¥5,000" data-en="+¥5,000 per additional person">追加1名：+¥5,000</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature1" data-ja="10m/30m、CMJ（両脚）" data-en="10m/30m, CMJ (both legs)">10m/30m、CMJ（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature2" data-ja="RB（両脚）" data-en="RB (both legs)">RB（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature3" data-ja="片脚CMJ（左右差）" data-en="Single-leg CMJ (L/R diff)">片脚CMJ（左右差）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature4" data-ja="RDL30（平均速度のみ）" data-en="RDL30 (avg speed only)">RDL30（平均速度のみ）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan1Feature5" data-ja="数値提示のみ" data-en="Data only">数値提示のみ</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature6" data-ja="個別評価なし" data-en="No individual assessment">個別評価なし</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan1Feature7" data-ja="トレーニングプログラムなし" data-en="No training program">トレーニングプログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-gray-200 text-gray-800 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        <span id="plan1CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Core Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan2Title" data-ja="VALORISE Core" data-en="VALORISE Core">VALORISE Core</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan2Subtitle" data-ja="スタンダードプラン" data-en="Standard Plan">スタンダードプラン</p>
                        <div class="text-4xl font-bold text-purple-600">
                            ¥250,000
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan2Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-gray-500 mt-1" id="plan2Capacity" data-ja="25名まで" data-en="Up to 25 people">25名まで</p>
                        <p class="text-xs text-gray-500" id="plan2Extra" data-ja="追加1名：+¥5,500" data-en="+¥5,500 per additional person">追加1名：+¥5,500</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature1" data-ja="スプリント（10m/30m）" data-en="Sprint (10m/30m)">スプリント（10m/30m）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature2" data-ja="CMJ・片脚CMJ" data-en="CMJ, Single-leg CMJ">CMJ・片脚CMJ</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature3" data-ja="RB（両脚・片脚）" data-en="RB (both legs, single leg)">RB（両脚・片脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature4" data-ja="RDL30（左右）" data-en="RDL30 (L/R)">RDL30（左右）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature5" data-ja="PushPress（両脚）" data-en="PushPress (both legs)">PushPress（両脚）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan2Feature6" data-ja="チームレポート提供" data-en="Team report">チームレポート提供</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-gray-300 mr-2 mt-1"></i>
                            <span class="text-sm text-gray-400" id="plan2Feature7" data-ja="個人レポートなし" data-en="No individual report">個人レポートなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        <span id="plan2CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Edge Plan (Recommended) -->
                <div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 shadow-2xl transform scale-105 relative" data-aos="fade-up" data-aos-delay="200">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        <span id="recommendedBadge" data-ja="おすすめ" data-en="Recommended">おすすめ</span>
                    </div>
                    <div class="text-center mb-6 text-white">
                        <h3 class="text-2xl font-bold mb-2" id="plan3Title" data-ja="VALORISE Edge" data-en="VALORISE Edge">VALORISE Edge</h3>
                        <p class="text-purple-100 text-sm mb-4" id="plan3Subtitle" data-ja="アドバンスプラン" data-en="Advanced Plan">アドバンスプラン</p>
                        <div class="text-4xl font-bold">
                            ¥440,000
                        </div>
                        <p class="text-sm text-purple-200 mt-2" id="plan3Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-purple-200 mt-1" id="plan3Capacity" data-ja="30名まで" data-en="Up to 30 people">30名まで</p>
                        <p class="text-xs text-purple-200" id="plan3Extra" data-ja="追加1名：+¥8,800" data-en="+¥8,800 per additional person">追加1名：+¥8,800</p>
                    </div>
                    <ul class="space-y-3 mb-8 text-white">
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature1" data-ja="全項目フルセット測定" data-en="Full comprehensive assessment">全項目フルセット測定</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature2" data-ja="個人レポート（コメント付き）" data-en="Individual report with comments">個人レポート（コメント付き）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-yellow-400 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan3Feature3" data-ja="チームレポート" data-en="Team report">チームレポート</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-times text-purple-300 mr-2 mt-1"></i>
                            <span class="text-sm text-purple-200" id="plan3Feature4" data-ja="個別プログラムなし" data-en="No individual program">個別プログラムなし</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-white text-purple-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        <span id="plan3CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
                
                <!-- Prime Plan -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
                    <div class="text-center mb-6">
                        <h3 class="text-2xl font-bold mb-2" id="plan4Title" data-ja="VALORISE Prime" data-en="VALORISE Prime">VALORISE Prime</h3>
                        <p class="text-gray-600 text-sm mb-4" id="plan4Subtitle" data-ja="プレミアムプラン" data-en="Premium Plan">プレミアムプラン</p>
                        <div class="text-3xl font-bold text-purple-600">
                            ¥660,000<span class="text-xl">〜</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-2" id="plan4Tax" data-ja="（税込）" data-en="(Tax Included)">(税込)</p>
                        <p class="text-xs text-gray-500 mt-1" id="plan4Capacity" data-ja="25名まで" data-en="Up to 25 people">25名まで</p>
                        <p class="text-xs text-gray-500" id="plan4Extra" data-ja="追加1名：+¥20,000" data-en="+¥20,000 per additional person">追加1名：+¥20,000</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature1" data-ja="全項目フルセット測定" data-en="Full comprehensive assessment">全項目フルセット測定</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature2" data-ja="個人レポート（コメント付き）" data-en="Individual report with comments">個人レポート（コメント付き）</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm" id="plan4Feature3" data-ja="チームレポート" data-en="Team report">チームレポート</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-sm font-semibold" id="plan4Feature4" data-ja="個別トレーニングプログラム" data-en="Individual training program">個別トレーニングプログラム</span>
                        </li>
                    </ul>
                    <a href="#contact" class="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-colors">
                        <span id="plan4CTA" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                    </a>
                </div>
            </div>
            
            <div class="mt-12 text-center">
                <p class="text-gray-600" id="pricingNote" data-ja="※出張測定の場合は別途交通費を頂戴いたします。詳細はお問い合わせください。" data-en="*Travel expenses apply for on-site measurements. Contact us for details.">※出張測定の場合は別途交通費を頂戴いたします。詳細はお問い合わせください。</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
                <span id="ctaTitle" data-ja="あなたのフィジカルの可能性を" data-en="Unlock Your Physical">あなたのフィジカルの可能性を</span><br>
                <span id="ctaTitle2" data-ja="最大化しませんか？" data-en="Potential Today">最大化しませんか?</span>
            </h2>
            <p class="text-xl mb-8 opacity-90" data-aos="fade-up" data-aos-delay="200">
                <span id="ctaSubtitle" data-ja="まずは無料相談から。専門家があなたのニーズに合わせたプランをご提案します。" data-en="Start with a free consultation. Our experts will propose a plan tailored to your needs.">まずは無料相談から。専門家があなたのニーズに合わせたプランをご提案します。</span>
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
                <a href="#contact" class="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-gray-100 transition-all transform hover:scale-105">
                    <i class="fas fa-envelope mr-2"></i>
                    <span id="ctaCTA1" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                </a>
                <a href="tel:+81-123-4567-8901" class="bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold inline-block hover:bg-purple-800 transition-all transform hover:scale-105">
                    <i class="fas fa-phone mr-2"></i>
                    <span id="ctaCTA2" data-ja="電話で相談" data-en="Call Us">電話で相談</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16" data-aos="fade-up">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span class="text-gradient" id="contactTitle" data-ja="お問い合わせ" data-en="Contact Us">お問い合わせ</span>
                </h2>
                <p class="text-xl text-gray-600" id="contactSubtitle" data-ja="ご質問・ご相談はお気軽にどうぞ" data-en="Feel free to ask any questions">ご質問・ご相談はお気軽にどうぞ</p>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <!-- Email Contact Card -->
                <div class="bg-white rounded-2xl p-12 shadow-xl text-center" data-aos="fade-up">
                    <div class="mb-8">
                        <i class="fas fa-envelope text-6xl text-purple-600 mb-6"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4" id="contactEmailTitle" data-ja="メールでのお問い合わせ" data-en="Contact via Email">メールでのお問い合わせ</h3>
                    <p class="text-gray-600 mb-8" id="contactEmailDesc" data-ja="下記のメールアドレスまでお気軽にお問い合わせください" data-en="Please feel free to contact us at the email address below">下記のメールアドレスまでお気軽にお問い合わせください</p>
                    <a href="mailto:nakagoshi@loopz.co.jp" class="inline-block text-2xl md:text-3xl font-bold text-purple-600 hover:text-purple-800 transition-colors mb-8">
                        <i class="fas fa-paper-plane mr-3"></i>nakagoshi@loopz.co.jp
                    </a>
                    <div class="mt-8 pt-8 border-t border-gray-200">
                        <p class="text-sm text-gray-500" id="contactNote" data-ja="※ 通常1-2営業日以内にご返信いたします" data-en="* We will reply within 1-2 business days">※ 通常1-2営業日以内にご返信いたします</p>
                    </div>
                </div>
                
                <!-- Contact Info -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up">
                        <i class="fas fa-phone text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="phoneTitle" data-ja="電話番号" data-en="Phone">電話番号</h3>
                        <a href="tel:08054646367" class="text-purple-600 hover:text-purple-800 text-sm font-semibold">080-5464-6367</a>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="50">
                        <i class="fas fa-envelope text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="emailTitle" data-ja="メール" data-en="Email">メール</h3>
                        <a href="mailto:nakagoshi@loopz.co.jp" class="text-purple-600 hover:text-purple-800 text-sm font-semibold">nakagoshi@loopz.co.jp</a>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="100">
                        <i class="fas fa-map-marker-alt text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="addressTitle" data-ja="所在地" data-en="Address">所在地</h3>
                        <p class="text-gray-600 text-sm">東京都調布市上石原2−40−6 B1F</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-md text-center" data-aos="fade-up" data-aos-delay="150">
                        <i class="fas fa-building text-3xl text-purple-600 mb-3"></i>
                        <h3 class="font-bold mb-2" id="companyTitle" data-ja="運営会社" data-en="Company">運営会社</h3>
                        <p class="text-gray-600 text-sm">株式会社LOOPZ</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4">VALORISE</h3>
                    <p class="text-gray-400 text-sm" id="footerDesc" data-ja="フィジカル測定で選手の可能性を最大化" data-en="Maximizing athlete potential through physical assessment">フィジカル測定で選手の可能性を最大化</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerQuickLinks" data-ja="クイックリンク" data-en="Quick Links">クイックリンク</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#about" class="text-gray-400 hover:text-white footer-link" data-ja="VALORISEとは" data-en="About">VALORISEとは</a></li>
                        <li><a href="#features" class="text-gray-400 hover:text-white footer-link" data-ja="特徴" data-en="Features">特徴</a></li>
                        <li><a href="#services" class="text-gray-400 hover:text-white footer-link" data-ja="測定項目" data-en="Services">測定項目</a></li>
                        <li><a href="#team" class="text-gray-400 hover:text-white footer-link" data-ja="測定スタッフ" data-en="Team">測定スタッフ</a></li>
                        <li><a href="#pricing" class="text-gray-400 hover:text-white footer-link" data-ja="料金プラン" data-en="Pricing">料金プラン</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerServices" data-ja="サービス" data-en="Services">サービス</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service1" data-ja="個人測定" data-en="Individual">個人測定</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service2" data-ja="チーム測定" data-en="Team">チーム測定</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service3" data-ja="トレーニング指導" data-en="Training">トレーニング指導</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white footer-service4" data-ja="コンサルティング" data-en="Consulting">コンサルティング</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4" id="footerContact" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><i class="fas fa-phone mr-2"></i>080-5464-6367</li>
                        <li><i class="fas fa-envelope mr-2"></i>nakagoshi@loopz.co.jp</li>
                        <li><i class="fas fa-map-marker-alt mr-2"></i>東京都調布市上石原2−40−6 B1F</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                <p>&copy; 2024 VALORISE - Powered by LOOPZ Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Axios for API calls -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    
    <!-- AOS Animation Library -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    <!-- Custom JavaScript -->
    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
