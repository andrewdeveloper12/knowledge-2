import React, { useState, useMemo } from 'react';
import { Search, Book, Settings, Wrench, Calendar, Users, Phone, Globe, Database, FileText, HelpCircle, Monitor } from 'lucide-react';

interface DataItem {
  id: string;
  category: string;
  title: string;
  content: string;
  type: string;
  searchTerms: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const data: DataItem[] = [
    // Day 1 - Page 1
    {
      id: '1',
      category: 'day1-basic-info',
      title: 'معلومات الاتصال الأساسية',
      content: '1. رقمنا: 19319\n2. رقم الواتساب: 01101019319\n3. Link: kbcc.elarabygroup.com/agent\n4. User: agent\n5. Password: ag@dmin123',
      type: 'reference',
      searchTerms: 'رقم اتصال واتساب link user password'
    },
    {
      id: '2',
      category: 'day1-knowledge-base',
      title: 'قاعدة المعرفة K.B',
      content: '1. الصفحة الرئيسية وبها الماركات وأنواع الأجهزة\n2. Home\n3. Contacts\n4. P&S&C\n5. Installation\n6. Process\n7. Service Level\n8. مواعيد العمل\n9. External Links\n10. C.R.M - Outlook - Cisco',
      type: 'reference',
      searchTerms: 'قاعدة المعرفة KB Home Contacts Installation Process Service Level CRM Outlook Cisco'
    },
    {
      id: '3',
      category: 'day1-device-categories',
      title: 'تقسيم الأجهزة',
      content: '1. الأجهزة المنزلية (HA): ثلاجة - غسالة - ...\n2. الأجهزة الشخصية (S.H.A): مروحة - موبايل - ...\n3. الصوتيات والمرئيات (A.V): الشاشات - المسرح المنزلي - ...',
      type: 'reference',
      searchTerms: 'تقسيم الأجهزة HA SHA AV ثلاجة غسالة مروحة موبايل شاشات مسرح منزلي'
    },
    {
      id: '4',
      category: 'day1-crm-system',
      title: 'برنامج C.R.M',
      content: 'هو برنامج خاص بتسجيل بيانات العملاء من:\n1. طلب صيانة\n2. تركيب\n3. استفسارات\n4. شكاوى',
      type: 'reference',
      searchTerms: 'برنامج CRM تسجيل بيانات العملاء صيانة تركيب استفسارات شكاوى'
    },
    {
      id: '5',
      category: 'day1-customer-registration',
      title: 'كيفية تسجيل بيانات العميل',
      content: '1. يتم الدخول على New Case واختيار أي نموذج لتسجيل بيانات العميل\n2. يتم الدخول على New Account وكتابة البيانات',
      type: 'procedure',
      searchTerms: 'تسجيل بيانات العميل New Case New Account'
    },
    {
      id: '6',
      category: 'day1-basic-data',
      title: 'البيانات الأساسية المطلوبة لتسجيل استفسار للعميل',
      content: '1. الاسم (رقم اتصالات - مستفاد)\n2. رقم الموبايل\n3. المنطقة (المحافظة من محافظات محافظة)',
      type: 'procedure',
      searchTerms: 'البيانات الأساسية اسم رقم موبايل منطقة محافظة'
    },
    {
      id: '7',
      category: 'day1-basic-data',
      title: ' المحافظة',
      content: 'يتم اختيار المحافظة ثم تسجيل المحافظة الظاهرة (رقم/الجهة/الحى/المنطقة/الفرع)',
      type: 'note',
      searchTerms: ' المحافظة اختيار تسجيل'
    },
    {
      id: '8',
      category: 'day1-secondary-data',
      title: 'البيانات الفرعية في حالة تسجيل البلاغ',
      content: '1. الرقم الفرعي للعميل\n2. رقم الدور\n3. البيانات (شارع من - الدور - الشقه - علامة مميزة)',
      type: 'procedure',
      searchTerms: 'البيانات الفرعية رقم فرعي دور شارع نقطة علامة مميزة'
    },

    // Day 1 - Page 2
    {
      id: '9',
      category: 'day1-inquiry-registration',
      title: 'كيفية تسجيل الاستفسار',
      content: '1. في حالة عدم وجود بلاغ يتم اختيار New Case واختيار نموذج الاستفسارات\n2. في حالة تسجيل بيانات جديدة يتم أخذ البيانات الأساسية فقط (اسم ثلاثي - محافظة - منطقة - رقم موبايل واحد)\n3. في حالة وجود بيانات يتم مراجعة الاسم ثلاثي فقط',
      type: 'procedure',
      searchTerms: 'تسجيل الاستفسار New Case نموذج الاستفسارات بيانات جديدة اسم ثلاثي'
    },
    {
      id: '10',
      category: 'day1-unrelated-inquiries',
      title: 'استفسارات ليس لها علاقة بالبلاغ',
      content: '1. يتم تسجيل استفسار استعلام عن موارد بشرية عند سؤال العميل عن (التوظيف بالشركة، الالتحاق بمدارس العربي)\n2. يتم تسجيل استفسار خدمات طبية عند الاتصال بالخطأ لحجز طبي بالعيادات\n3. يتم تسجيل استفسار شكوى من الخدمات الطبية عندما يشكو العميل من الخدمات الطبية\n4. يتم تسجيل استفسار مكالمة شكر في حالة اتصال العميل شكر أي شخص داخل العربي\n5. يتم تسجيل استفسار موبايل غير تابع للعربي عند اتصال العميل لأي ماركة غير تابعة للعربي ويتم كتابة (اسم المنتج وسبب الاتصال في التفاصيل)\n6. يتم تسجيل استفسار عن السؤال على سعر منتج ويتم تسجيل الموبايل (الأعلى سعراً)\n7. يتم تسجيل استفسار تحويل العميل الى قسم (التعيينات - المكتبة)\n8. يتم تسجيل استفسار تحويل العميل في حالة أن الجهاز يتضمن ميراكو ويتم التوضيح للعميل بالاتصال برقم 19119، كذلك (اسم المنتج في التفاصيل)\n9. يتم تسجيل استفسار استعلام عن حجز قاعات في مسجد الرحمن الرحيم (العزاء فقط)',
      type: 'procedure',
      searchTerms: 'استفسارات موارد بشرية خدمات طبية شكوى مكالمة شكر موبايل غير تابع سعر منتج تحويل ميراكو حجز قاعات'
    },

    // Day 2 - Page 1
    {
      id: '11',
      category: 'day2-installations',
      title: 'التركيبات',
      content: '1. أجهزة لا يشترط تركيبها (المروحة، المسرح المنزلي، الشاشات...)\n2. أجهزة يتم تركيبها (غسالة، غسالة أطباق...)\n3. أجهزة لا يتم تركيبها (ثلاجة، ديب فريزر...)',
      type: 'reference',
      searchTerms: 'التركيبات أجهزة مروحة مسرح منزلي شاشات غسالة أطباق ثلاجة ديب فريزر'
    },
    {
      id: '12',
      category: 'day2-installations',
      title: 'ملحوظة تفعيل الضمان',
      content: 'في حالة توقيع العميل وإتمام إجراء جهاز جديد ويريد تفعيل الضمان:\n1. يتم توجيه العميل للتواصل عبر الواتساب واختيار خدمة تفعيل الضمان\n2. يتم إعادة العميل بموعد استلامه طوال الأسبوع من الساعة 9 صباحاً حتى 10 مساءً\n3. مع العلم أن العميل يتم تسجيل بياناته الضريبية في حالة تفعيل الضمان منفصلاً عن التاريخ الموضح على فاتورة الشراء الضريبية\n4. يتم تسجيل العميل تلفون أو عنوان أو فرع من فروع الشركة',
      type: 'note',
      searchTerms: 'ملحوظة تفعيل الضمان واتساب موعد استلام بيانات ضريبية فاتورة شراء'
    },
    {
      id: '13',
      category: 'day2-equipment',
      title: 'التجهيزات',
      content: '1. يتم إبلاغ العميل بالتجهيزات الخاصة بكل جهاز سواء تركيبية (الغسالة، السخان، غسالة الأطباق، الشفاط)\n2. بخصوص الشاشات يتم الدخول على Installation والضغط على الجهاز المراد تركيبه\n3. في حالة عدم إمكانية الدخول يتم تجهيزاتك عن طريق الدخول على الجهاز والضغط على Troubleshooting\n4. بخصوص الميكرويف يتم الدخول على تجهيزاتك عن طريق الدخول على الجهاز والضغط على Troubleshooting\n5. بخصوص الشفاط الالكتروني يتم تسجيل إبلاغ تركيب، اذا ما ظهر العميل بذلك في مناطق الجيزة والجهاز، والا ساعة عمل من إبلاغه، اما في المحافظات يتم ارسال مندوب من فرع Agent Process Guide',
      type: 'procedure',
      searchTerms: 'التجهيزات إبلاغ العميل غسالة سخان أطباق شفاط شاشات Installation Troubleshooting ميكرويف الكتروني'
    },
    {
      id: '14',
      category: 'day2-installation-costs',
      title: 'تكاليف التركيب',
      content: '1. يتم معرفتها عن طريق الدخول على Process والبحث بكلمة (تكليف)\n2. يتم معرفتها أيضا عن طريق الدخول على Installation والضغط على الجهاز المراد تركيبه\n3. في حالة استلام العميل على الفاتورة يتم تسجيل استفسار غير راضى عن سياسة واجراءات الشركة',
      type: 'procedure',
      searchTerms: 'تكاليف التركيب Process تكليف Installation فاتورة استفسار غير راضي'
    },
    {
      id: '15',
      category: 'day2-mobiles',
      title: 'الموبيلات',
      content: '1. يتم فحص العميل عن طريق الموديل الذي يتم تركيبه على حسب جودة على جهاز وذلك عن طريق الدخول على Process والبحث بكلمة (تعديل)\n2. في حالة مسئولية العميل يتم سؤال العميل، عرض فيديو يظهر الجهاز او الكود او القوائم او شهادة الضمان\n3. ضروري في إبلاغ العميل (الاسم والرقم السري) للعميل في حالة عدم معرفة العميل بذلك والتواصل، يتم رفع\n4. في حالة عدم معرفة العميل بذلك يتم الاكتفاء بالسؤال على رفع الفاتورة وتسجيل الموديل غير معروف',
      type: 'procedure',
      searchTerms: 'الموبيلات فحص العميل موديل Process تعديل مسئولية فيديو كود قوائم شهادة ضمان اسم رقم سري فاتورة'
    },

    // Day 2 - Page 2
    {
      id: '16',
      category: 'day2-registration-steps',
      title: 'خطوات تسجيل بلاغ تركيب للعميل - General',
      content: '1. يتم تسجيل البيانات الأساسية والفرعية الخاصة بالعميل أو مراجعتها وتكملة الناقص في حالة وجود بيانات سابقة\n2. يتم معرفة البيانات السابقة من بلاغ تمت عليه الزيارة عن طريق قائمة Show Customer Data\n3. وعدم سؤال العميل عليها مرة أخرى',
      type: 'procedure',
      searchTerms: 'خطوات تسجيل بلاغ تركيب General بيانات أساسية فرعية Show Customer Data'
    },
    {
      id: '17',
      category: 'day2-registration-steps',
      title: 'Caller Number',
      content: 'تسجيل الرقم المتصل منه العميل في خانة Caller Number',
      type: 'procedure',
      searchTerms: 'Caller Number رقم متصل عميل خانة'
    },
    {
      id: '18',
      category: 'day2-product-info',
      title: 'Product Group',
      content: 'يتم اختيار فئة المنتج (HA-SHA-AV-AC) في خانة Product Group',
      type: 'procedure',
      searchTerms: 'Product Group فئة المنتج HA SHA AV AC خانة'
    },
    {
      id: '19',
      category: 'day2-product-info',
      title: 'Product Type',
      content: 'يتم اختيار اسم المنتج (غسالة- سخان) في خانة Product Type',
      type: 'procedure',
      searchTerms: 'Product Type اسم المنتج غسالة سخان خانة'
    },
    {
      id: '20',
      category: 'day2-product-info',
      title: 'Brand',
      content: 'يتم اختيار ماركة الجهاز في خانة Brand ولو المنتج تجارياً لازم نسأل الضمان على أسم العربي',
      type: 'procedure',
      searchTerms: 'Brand ماركة جهاز خانة تجاري ضمان عربي'
    },
    {
      id: '21',
      category: 'day2-product-info',
      title: 'Model Number',
      content: 'يتم اختيار الموديل في خانة Model Number بعد سؤال العميل عنه وفي حالة أنه غير معروف يتم اختيار أي موديل أية علاقة بالملاحظات غير معروف',
      type: 'procedure',
      searchTerms: 'Model Number موديل خانة سؤال العميل غير معروف ملاحظات'
    },
    {
      id: '22',
      category: 'day2-product-info',
      title: 'ملحوظة الموديل',
      content: '(الديب فريزر بنسأل كام درج - السخان بنسأل هو غاز ولا كهرباء وكام لتر- البوتاجاز بنسأل هو بلت إن ولا عادي وهو كام شعلة - التكييف بنسأل هو كام حصان)',
      type: 'note',
      searchTerms: 'ملحوظة الموديل ديب فريزر درج سخان غاز كهرباء لتر بوتاجاز بلت إن شعلة تكييف حصان'
    },
    {
      id: '23',
      category: 'day2-product-info',
      title: 'Problem',
      content: 'يتم كتابة نوع العطل واختياره في خانة Problem',
      type: 'procedure',
      searchTerms: 'Problem نوع العطل كتابة اختيار خانة'
    },
    {
      id: '24',
      category: 'day2-product-info',
      title: 'ملحوظة البوتاجاز',
      content: 'في حالة تركيب البوتاجاز يتم سؤال العميل على غاز طبيعي ام انبوبة، لان شركة الغاز هي المسئولة عن توصيل الجهاز على غاز طبيعي، اما في حالة تركيب على انبوبة يتم سؤال العميل الجهاز يحتاج خرطوم وتم اختيار العميل تركيب وتوصيل يتم اختيار العميل تركيب فقط، اما لو يحتاج خرطوم وتوصيل يتم اختيار تركيب وتوصيل الغاز',
      type: 'note',
      searchTerms: 'ملحوظة البوتاجاز تركيب غاز طبيعي انبوبة شركة الغاز خرطوم تركيب وتوصيل'
    },
    {
      id: '25',
      category: 'day2-product-info',
      title: 'تاريخ الشراء أو التركيب',
      content: 'يتم اختيار التاريخ الذي أوضحه العميل',
      type: 'procedure',
      searchTerms: 'تاريخ الشراء التركيب اختيار التاريخ أوضحه العميل'
    },
    {
      id: '26',
      category: 'day2-product-info',
      title: 'ملحوظة التاريخ',
      content: 'في حالة توضيح تاريخ غير موجود يتم اختيار التاريخ الأعلى، في حالة عدم معرفة العميل يتم اختيار 3 سنوات',
      type: 'note',
      searchTerms: 'ملحوظة التاريخ غير موجود اختيار الأعلى عدم معرفة 3 سنوات'
    },
    {
      id: '27',
      category: 'day2-work-order',
      title: 'Work Order Information',
      content: '1. يتم الدخول على خانة Work Order Information لحجز الموعد عن طريق الضغط على البلاغ لتحديده\n2. والضغط على Auto Schedule لإبلاغ العميل\n3. ضرورة إبلاغ العميل بتجهيز أصل شهادة الضمان وفاتورة الشراء لإطلاع الفني عليهم',
      type: 'procedure',
      searchTerms: 'Work Order Information حجز موعد ضغط البلاغ Auto Schedule إبلاغ العميل شهادة ضمان فاتورة شراء فني'
    },

    // Day 2 - Page 3
    {
      id: '28',
      category: 'day2-notes',
      title: 'ملاحظات خدمة العملاء',
      content: '1. لا يتم كتابة أي رقم للعميل بملاحظات خدمة العملاء وفي حالة أن العميل يريد أن يضيف أرقام أخرى بخلاف الأرقام الأساسية والفرعية\n2. يتم تسجيلها في خانة (إضافة رقم)',
      type: 'notes',
      searchTerms: 'ملاحظات خدمة العملاء رقم أرقام أخرى أساسية فرعية إضافة رقم'
    },
    {
      id: '29',
      category: 'day2-notes',
      title: 'تغيير الموعد أثناء المكالمة',
      content: '1. في حالة طلب العميل تغيير الموعد يمكن ذلك المكالمة (كليم) من تاني يوم المكالمة أثناء تسجيل البلاغ مع تسجيل خانة بعد اليوم (ميعاد محدد من العميل)\n2. وفي حالة طلبه موعد بعد الرد أيام يتم الإبلاغ بالاتصال قبل الموعد المحدد بـ (3 أيام)',
      type: 'procedure',
      searchTerms: 'تغيير موعد مكالمة كليم تاني يوم تسجيل بلاغ ميعاد محدد 3 أيام'
    },
    {
      id: '30',
      category: 'day2-notes',
      title: 'تأجيل موعد الزيارة',
      content: '1. في حالة اتصال العميل وطلبه بلاغ مسجل ويريد تأجيل موعد الزيارة في نفس يوم الزيارة يتم إبلاغ العميل بانتظار اتصال الفني وتسجيل الموعد معه وتسجيل استفسار ميعاد حجز اليوم\n2. في حالة وجود موعد للعميل وقام بالاتصال لتأجيل الموعد لمدة أكثر من 5 أيام من تاريخ الإنشاء يتم إبلاغ بانه سوف يتم إلغاء البلاغ والاتصال قبل الموعد المطلوب بـ 3 أيام\n3. في حالة وجود موعد للعميل وقام بالاتصال لتأجيل الموعد لمدة داخل 5 أيام من تاريخ الإنشاء يتم تأجيل الموعد بشكل طبيعي مع تسجيل تاسك على البلاغ (ميعاد محدد من العميل) وتسجيل استفسار أمر شغل مفتوح',
      type: 'procedure',
      searchTerms: 'تأجيل موعد الزيارة اتصال العميل بلاغ مسجل انتظار الفني استفسار ميعاد حجز إلغاء البلاغ تاسك أمر شغل مفتوح'
    },
    {
      id: '31',
      category: 'day2-notes',
      title: 'مشكلة في حجز الميعاد',
      content: '1. في حالة وجود مشكلة في ظهور الموعد يتم تسجيل تاسك (مشكلة في حجز الميعاد) وإبلاغ العميل أنه سوف يتم إرسال رسالة بموعد الحجز خلال 24 ساعة عمل من تاني يوم المكالمة\n2. في حالة تسجيل بلاغ وعند توضيح العميل منطقة غير متواجدة على برنامج CRM يتم اختيار أقرب منطقة للعميل مع تسجيل تاسك على البلاغ بعنوان (غير تابع لمركز خدمة)\n3. في حالة طلب العميل إلغاء البلاغ يتم تسجيل تاسك (إلغاء البلاغ) مع ذكر سبب الإلغاء بالتاسك ويكون العميل متصل من نفس الرقم المسجل بة للبلاغ ومراجعة كافة البيانات مع العميل عدا العنوان',
      type: 'procedure',
      searchTerms: 'مشكلة حجز الميعاد تاسك رسالة موعد الحجز 24 ساعة منطقة غير متواجدة CRM أقرب منطقة غير تابع مركز خدمة إلغاء البلاغ سبب الإلغاء'
    },
    {
      id: '32',
      category: 'day2-technician-types',
      title: 'أنواع الفنيين',
      content: '1. (M.S.C) فني شركة العربي القائم بالزيارة\n2. (L.S.C) فني شركة العربي المتواجد في المحلية\n3. (A.S.C) فني مركز الخدمة القائم بالزيارة / متواجد بالمركز',
      type: 'reference',
      searchTerms: 'أنواع الفنيين MSC LSC ASC شركة العربي المحلية مركز الخدمة'
    },

    // Day 4 - التكييف
    {
      id: '33',
      category: 'day4-ac-purchase',
      title: 'طرق الشراء للتكييف',
      content: '1. من خلال العربي (الفروع الرئيسية – الموقع – البيع بالاتصال)\n2. من موزع (موزع معتمد – موزع تجزئة)',
      type: 'reference',
      searchTerms: 'طرق الشراء التكييف العربي فروع رئيسية موقع بيع بالاتصال موزع معتمد تجزئة'
    },
    {
      id: '34',
      category: 'day4-ac-installation-free',
      title: 'متى يكون التركيب مجاناً؟',
      content: '1. عند الشراء من خلال العربي مباشر، بشرط توافر (فاتورة الشراء)\n2. عند الشراء من كارفور و نون، بشرط توافر (الفاتورة القانونية)\n3. عند الشراء من موزع معتمد و متواجد مع العميل فاتورة قانونية مدون عليها كود التركيبات المتواجد في شيت التركيبات، بشرط توافر (الفاتورة القانونية)\n4. عند الشراء من موزع تجزئة و متواجد مع العميل فاتورة قانونية واسم الموزع غير موجود في شيت التركيبات، يتم البحث بأسم الموزع فى خانة موزعين التجزئة الموجودة بقاعدة المعرفة\n5. لو موجود يتم تسجيل استفسار تركيب تكييف تم الشراء من موزع\n6. ويشترط اخذ رقم العميل المدون على الفاتورة واسم الموزع ورقم الفاتورة و كتابتهم فى تفاصيل الاستفسار\n7. وتوضيح للعميل انه سوف يتم التواصل معة خلال 48 ساعة عمل من تانى يوم للتركيب من خلال الموزع\n8. فى حالة تواصل العميل داخل مدة 48 ساعة يتم تسجيل نوت على الاستفسار بالتواصل مع العميل وابلاغ العميل بانتظار المدة\n9. فى حالة تواصل العميل بعد مدة 48 ساعة يتم تسجيل بلاغ تركيب مجانا وكتابة اسم الموزع وانه سوف يتم تحميل التكلفة على الموزع',
      type: 'conditions',
      searchTerms: 'التركيب مجاناً شراء عربي مباشر كارفور نون موزع معتمد تجزئة فاتورة قانونية كود التركيبات شيت 48 ساعة نوت'
    },
    {
      id: '35',
      category: 'day4-ac-installation-paid',
      title: 'متى يكون التركيب بتكلفة؟',
      content: '1. عند الشراء من موزع معتمد او غير معتمد وغير متواجد مع العميل فاتورة قانونية مدون عليها كود التركيبات المتواجد في الشيت او غير موجود بخانة موزعين التجزئة\n2. فى حالة تركيب او فك جهاز مستعمل تابع للشركة وقبل تسجيل البلاغ يتم سؤال العميل عن مساحة الغرفة التى سيتم التركيب بها والدخول على جدول المساحات\n3. وفى حالة ان المساحة مناسبة يتم تسجيل البلاغ بشكل طبيعى اما اذا كان العميل لا يعرف المساحة فيتم ارسال ميل ويتم الرجوع لل Agent process guide\n4. ولا يمكن فك او تركيب جهاز غير تابع للشركة',
      type: 'conditions',
      searchTerms: 'التركيب بتكلفة موزع معتمد غير معتمد فاتورة قانونية كود التركيبات شيت موزعين التجزئة جهاز مستعمل مساحة الغرفة جدول المساحات Agent process guide'
    },
    {
      id: '36',
      category: 'day4-ac-components',
      title: 'المشتملات',
      content: '1. يتم توضيح مشتملات الجهاز للعميل ويتم معرفتها عن طريق الدخول على Troubleshooting والضغط على اجراءات تسجيل بلاغ وتوضيح المشتملات منها\n2. او عن طريق الدخول على Installation',
      type: 'procedure',
      searchTerms: 'المشتملات توضيح الجهاز العميل Troubleshooting اجراءات تسجيل بلاغ Installation'
    },
    {
      id: '37',
      category: 'day4-ac-costs',
      title: 'تكاليف التركيب الخاصة بالتكييف',
      content: '1. يتم الدخول على Troubleshooting والضغط على تكاليف اعمال التركيب الاضافية ويوجد بها:\n2. تكاليف تركيب جهاز جديد تم شراءه من خلال العربى او جهاز مستعمل\n3. تكاليف الفك للاجهزة\n4. تكاليف المشتملات\n5. تكاليف النقل',
      type: 'reference',
      searchTerms: 'تكاليف التركيب التكييف Troubleshooting اعمال التركيب الاضافية جهاز جديد مستعمل الفك المشتملات النقل'
    },
    {
      id: '38',
      category: 'day4-ac-model-registration',
      title: 'كيفية تسجيل موديل التكييف داخل البلاغ',
      content: '1. فى حالة تسجيل موديل لتكييف 1.5 حصان مثلا يتم كتابة رقم 12 واختيار اى موديل يظهر وكذلك الامر فى باقى الاجهزة كالاتى:\n2. 1.5=12\n3. 2.25=18\n4. 3=24\n5. 4=??',
      type: 'procedure',
      searchTerms: 'تسجيل موديل التكييف البلاغ حصان رقم 12 18 24'
    },
    {
      id: '39',
      category: 'day4-ac-notes',
      title: 'ملحوظات التكييف',
      content: '1. تسجيل بلاغ المعاينة يكون من خلال فريق المبيعات\n2. تكييف توشيبا بضمان كاريير\n3. يتم تسجيل بلاغات لمنتج التكييف لماركة (Hisense) في حالة أن المنتج بضمان العربي فقط\n4. يتم اختيار جهة الشراء فى العطل الثانى للبلاغ كالاتى:\n   - فى حالة الشراء من العربى يتم اختيار "تم الشراء من العربى"\n   - في حالة شراء العميل عن طريق البيع المؤسسي يتم إختيار "تم الشراء بيع مؤسسي"\n   - في حالة شراء العميل من موزع معتمد أو غير معتمد يتم إختيار "تم الشراء من تاجر"\n   - في حالة شراء العميل من كبار التجار مثل كارفور و بى تك يتم إختيار "تم الشراء من Retail"\n5. فى حالة تسجيل بلاغ فك وتركيب للتكييف يتم كتابة عنوان الفك بخانة العنوان وعنوان التركيب بالملاحظات',
      type: 'notes',
      searchTerms: 'ملحوظات التكييف المعاينة فريق المبيعات توشيبا كاريير Hisense ضمان العربي جهة الشراء البيع المؤسسي تاجر Retail فك تركيب'
    },
    {
      id: '40',
      category: 'day4-ac-maintenance',
      title: 'الصيانة الدورية',
      content: '1. الصيانة الدورية تكون لمنتج التكييف داخل الضمان مجاناً\n2. خارج الضمان تكون التكلفة متواجدة في Agent Process Guide',
      type: 'reference',
      searchTerms: 'الصيانة الدورية التكييف الضمان مجاناً خارج الضمان Agent Process Guide'
    },
    {
      id: '41',
      category: 'day4-multiple-case',
      title: 'Multiple Case - الشروط الأساسية',
      content: '1. يتم تسجيل اكثر من بلاغ من نفس نوع المنتج داخل نفس البلاغ ولكن يشترط:\n2. ان يكون نفس العميل\n3. نفس نوع المنتج\n4. نفس السكن "منزل خاص شقتين مختلفتين بعمارة سكنية واحدة"',
      type: 'conditions',
      searchTerms: 'Multiple Case شروط أساسية بلاغ نوع المنتج نفس العميل السكن منزل خاص شقتين عمارة سكنية'
    },
    {
      id: '42',
      category: 'day4-multiple-case',
      title: 'Multiple Case - أكثر من 8 أجهزة',
      content: '1. فى حالة طلب العميل تسجيل لاكثر من 8 اجهزة يتم تسجيل استفسار امر شغل مفتوح\n2. وتسجيل تاسك بأسم "تسجيل اكثر من بلاغ من نفس نوع المنتج"\n3. وابلاغ العميل بارسال رسالة بموعد الحجز\n4. حيث يتم كتابة بيانات العميل بالاستفسار وبيانات المنتج بالتاسك',
      type: 'procedure',
      searchTerms: 'Multiple Case أكثر من 8 أجهزة استفسار امر شغل مفتوح تاسك رسالة موعد الحجز بيانات العميل المنتج'
    },
    {
      id: '43',
      category: 'day4-multiple-case',
      title: 'Multiple Case - نفس يوم الزيارة',
      content: '1. فى حالة طلب العميل تسجيل بلاغ ويوجد بلاغ اخر من نفس نوع المنتج فى نفس يوم الزيارة\n2. يتم ابلاغ العميل بانتظار الفنى واخباره',
      type: 'procedure',
      searchTerms: 'Multiple Case نفس يوم الزيارة بلاغ اخر نوع المنتج ابلاغ العميل انتظار الفني'
    },
    {
      id: '44',
      category: 'day4-multiple-case',
      title: 'Multiple Case - قبل يوم الزيارة',
      content: '1. فى حالة طلب العميل تسجيل بلاغ ويوجد بلاغ اخر من نفس نوع المنتج قبل يوم الزيارة\n2. يتم تسجيل تاسك بأسم "تسجيل بلاغ اخر للعميل"',
      type: 'procedure',
      searchTerms: 'Multiple Case قبل يوم الزيارة بلاغ اخر نوع المنتج تاسك تسجيل بلاغ اخر للعميل'
    },
    {
      id: '45',
      category: 'day4-multiple-case',
      title: 'Multiple Case - أثناء نفس المكالمة',
      content: '1. فى حالة طلب العميل تسجيل بلاغ اخر من نفس نوع المنتج بعد حجز الموعد واثناء نفس المكالمة\n2. يتم الغاء البلاغ وتسجيل بلاغ جديد بطلب العميل',
      type: 'procedure',
      searchTerms: 'Multiple Case أثناء نفس المكالمة بلاغ اخر نوع المنتج حجز الموعد الغاء البلاغ تسجيل بلاغ جديد'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع المحتويات', icon: Book },
    { id: 'day1-basic-info', name: 'معلومات الاتصال', icon: Phone },
    { id: 'day1-knowledge-base', name: 'قاعدة المعرفة', icon: Database },
    { id: 'day1-device-categories', name: 'تقسيم الأجهزة', icon: Monitor },
    { id: 'day1-crm-system', name: 'برنامج CRM', icon: Settings },
    { id: 'day1-customer-registration', name: 'تسجيل بيانات العميل', icon: Users },
    { id: 'day1-basic-data', name: 'البيانات الأساسية', icon: FileText },
    { id: 'day1-secondary-data', name: 'البيانات الفرعية', icon: FileText },
    { id: 'day1-inquiry-registration', name: 'تسجيل الاستفسار', icon: HelpCircle },
    { id: 'day1-unrelated-inquiries', name: 'استفسارات غير مرتبطة', icon: HelpCircle },
    { id: 'day2-installations', name: 'التركيبات', icon: Wrench },
    { id: 'day2-equipment', name: 'التجهيزات', icon: Settings },
    { id: 'day2-installation-costs', name: 'تكاليف التركيب', icon: Wrench },
    { id: 'day2-mobiles', name: 'الموبيلات', icon: Phone },
    { id: 'day2-registration-steps', name: 'خطوات التسجيل', icon: Calendar },
    { id: 'day2-product-info', name: 'معلومات المنتج', icon: Settings },
    { id: 'day2-work-order', name: 'Work Order', icon: Calendar },
    { id: 'day2-notes', name: 'الملاحظات', icon: Users },
    { id: 'day2-technician-types', name: 'أنواع الفنيين', icon: Users },
    { id: 'day4-ac-purchase', name: 'طرق شراء التكييف', icon: Settings },
    { id: 'day4-ac-installation-free', name: 'التركيب المجاني', icon: Settings },
    { id: 'day4-ac-installation-paid', name: 'التركيب بتكلفة', icon: Wrench },
    { id: 'day4-ac-components', name: 'المشتملات', icon: Settings },
    { id: 'day4-ac-costs', name: 'تكاليف التكييف', icon: Wrench },
    { id: 'day4-ac-model-registration', name: 'تسجيل موديل التكييف', icon: Settings },
    { id: 'day4-ac-notes', name: 'ملحوظات التكييف', icon: Users },
    { id: 'day4-ac-maintenance', name: 'الصيانة الدورية', icon: Wrench },
    { id: 'day4-multiple-case', name: 'Multiple Case', icon: Calendar }
  ];

  const filteredData = useMemo(() => {
    let filtered = data;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.searchTerms.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, activeCategory]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstResult = filteredData[0];
      if (firstResult) {
        const element = document.getElementById(firstResult.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2 md:space-x-4 space-x-reverse">
              <Book className="h-8 w-8 text-blue-600" />
              <h1 className="text-lg md:text-xl font-bold text-gray-900">قاعدة المعرفة التقنية</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2 md:mx-8">
              <div className="relative">
                <Search className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في جميع المحتويات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="w-full pr-8 md:pr-10 pl-2 md:pl-4 py-1.5 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex gap-4 md:gap-8 relative">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-50 md:relative md:bg-transparent' : 'hidden'} md:block w-80 flex-shrink-0`}>
            <div className={`${isSidebarOpen ? 'fixed right-0 top-0 h-full w-80 transform translate-x-0' : 'md:relative'} bg-white rounded-lg shadow-sm border p-4 md:p-6 md:sticky md:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto transition-transform duration-300 ease-in-out`}>
              <div className="flex items-center justify-between mb-4 md:mb-4">
                <h2 className="text-lg font-semibold text-gray-900">الأقسام</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-1 md:space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 md:space-x-3 space-x-reverse px-2 md:px-3 py-2 rounded-lg text-right transition-colors text-xs md:text-sm ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
                      <span className="truncate">{category.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Summary */}
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {activeCategory === 'all' ? 'جميع المحتويات' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                {searchQuery && `نتائج البحث عن "${searchQuery}" - `}
                {filteredData.length} عنصر
              </p>
            </div>

            {/* Content Grid */}
            <div className="space-y-4 md:space-y-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="bg-white rounded-lg shadow-sm border p-4 md:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <span className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'procedure' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'reference' ? 'bg-green-100 text-green-800' :
                        item.type === 'note' ? 'bg-yellow-100 text-yellow-800' :
                        item.type === 'notes' ? 'bg-yellow-100 text-yellow-800' :
                        item.type === 'guide' ? 'bg-purple-100 text-purple-800' :
                        item.type === 'conditions' ? 'bg-orange-100 text-orange-800' :
                        item.type === 'troubleshooting' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.type === 'procedure' ? 'إجراء' :
                         item.type === 'reference' ? 'مرجع' :
                         item.type === 'note' || item.type === 'notes' ? 'ملاحظة' :
                         item.type === 'guide' ? 'دليل' :
                         item.type === 'conditions' ? 'شروط' :
                         item.type === 'troubleshooting' ? 'استكشاف الأخطاء' :
                         'عام'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm md:text-base">
                    <div className="whitespace-pre-line break-words">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-8 md:h-12 w-8 md:w-12 mx-auto" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">لم يتم العثور على نتائج</h3>
                <p className="text-sm md:text-base text-gray-600">جرب البحث بكلمات مختلفة أو اختر قسماً آخر</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="text-center text-gray-600 text-sm md:text-base">
            <p>© 2025 قاعدة المعرفة التقنية - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;