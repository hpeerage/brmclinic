// Shared Data Management for Bareunmom Clinic
const DEFAULT_DATA = {
    hero: {
        title: '바른몸을 향한 프리미엄 솔루션',
        subtitle: '근본적인 원인을 찾아 바른 정렬과 균형을 되찾아 드립니다.',
        bgImg: 'assets/hero.png'
    },
    director: {
        name: '정지웅',
        title: '바른몸 케어센터 대표원장',
        philosophy: '단순한 통증 완화를 넘어, 신체의 근본적인 균형을 바로잡아 일상의 활력을 되찾아 드립니다. 10년 이상의 임상 경험과 정교한 수기 테크닉으로 당신만을 위한 맞춤 솔루션을 약속합니다.',
        profileImg: 'assets/director.png',
        signatureImg: 'assets/logo.svg' // Placeholder for signature
    },
    programs: [
        { id: 1, title: '페이스 왁싱', desc: '깔끔한 인상과 매끈한 피부 결을 위한 프리미엄 얼굴 왁싱 전문 관리입니다.', icon: 'star', img: 'assets/prog1.png' },
        { id: 2, title: '다이어트 프로그램', desc: '단순한 체중 감량을 넘어 개인별 체질에 맞춘 건강한 다이어트 솔루션을 제공합니다.', icon: 'activity', img: 'assets/prog2.png' },
        { id: 3, title: '프리미엄 임산부 케어', desc: '산전/산후 패키지로 구성된 전문 관리를 통해 편안한 임신 기간과 빠른 회복을 돕습니다.', icon: 'heart', img: 'assets/prog3.png' },
        { id: 4, title: '균정체형교정', desc: '신체 불균형의 근본적인 원인을 분석하여 바른 정렬과 균형을 되찾아 드립니다.', icon: 'anchor', img: 'assets/prog4.png' },
        { id: 5, title: 'BRM Face (안면경락)', desc: '정교한 수기 테크닉을 통한 안면 경락 리프팅으로 탄력 있는 V라인을 완성합니다.', icon: 'smile', img: 'assets/prog5.png' },
        { id: 6, title: '쏙(Ssok) 프로그램', desc: '등+하체, 복부+하체 등 부위별 집중 슬리밍 프로그램으로 매끄러운 라인을 만듭니다.', icon: 'layers', img: 'assets/prog6.png' },
        { id: 7, title: 'BRM DETOX', desc: '몸속에 쌓인 독소와 노폐물 배출을 돕는 마사지로 몸과 마음을 정화하는 디톡스 케어입니다.', icon: 'wind', img: 'assets/prog7.png' },
        { id: 8, title: '릴랙스 통증 관리', desc: '어깨, 목, 등, 허리 등 주요 통증 부위를 집중 관리하여 일상의 편안함을 되찾아 드립니다.', icon: 'zap', img: 'assets/prog8.png' }
    ],
    cases: [
        { id: 1, title: '체형 교정 사례 1', before: 'assets/before.png', after: 'assets/after.png' }
    ],
    gallery: [
        { id: 1, img: 'assets/gallery1.png' },
        { id: 2, img: 'assets/gallery2.png' },
        { id: 3, img: 'assets/gallery3.png' },
        { id: 4, img: 'assets/gallery4.png' }
    ],
    footer: {
        address: '경기도 성남시 분당구 판교역로 192번길 14, 2층',
        phone: '010-8671-1135',
        hours: '평일 10:00 - 21:00 | 토요일 10:00 - 17:00 (일요일 휴무)',
        sns: {
            instagram: 'https://instagram.com/brmclinic',
            naver: 'https://blog.naver.com/brmclinic'
        }
    },
    partners: [
        { id: 1, name: 'Partner 1', img: 'assets/logo.svg' }
    ]
};

function getClinicData() {
    const saved = localStorage.getItem('clinicData');
    if (!saved) return DEFAULT_DATA;
    
    try {
        const parsed = JSON.parse(saved);
        // Merge saved data with default structure to ensure new fields (director, gallery, etc.) exist
        return {
            ...DEFAULT_DATA,
            ...parsed,
            hero: { ...DEFAULT_DATA.hero, ...parsed.hero },
            director: { ...DEFAULT_DATA.director, ...(parsed.director || {}) },
            footer: { ...DEFAULT_DATA.footer, ...(parsed.footer || {}) },
            partners: parsed.partners || DEFAULT_DATA.partners
        };
    } catch (e) {
        return DEFAULT_DATA;
    }
}

function saveClinicData(data) {
    localStorage.setItem('clinicData', JSON.stringify(data));
}
