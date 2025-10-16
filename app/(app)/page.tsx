import { AlertTriangle, Calendar, Package, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

const OVERVIEW_CARDS = [
  {
    title: '전체 재고',
    value: '1,248건',
    change: '+8.4%',
    icon: Package,
    accent: 'bg-brand/10 text-brand'
  },
  {
    title: '이번 주 소모',
    value: '384건',
    change: '-2.1%',
    icon: Calendar,
    accent: 'bg-emerald-100 text-emerald-700'
  },
  {
    title: '임박 품목',
    value: '16건',
    change: '+3 신규',
    icon: AlertTriangle,
    accent: 'bg-amber-100 text-amber-700'
  }
];

const INSIGHTS = [
  {
    title: '월간 사용 추세',
    description: '지난 달 대비 12% 증가했으며, 의료 소모품 카테고리에서 상승세가 두드러집니다.'
  },
  {
    title: '예상 주문 일정',
    description: '소모량이 가장 높은 5개 품목은 다음 주 내 재주문이 필요합니다.'
  }
];

export default function DashboardPage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-10 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-widest text-slate-300">오늘도 효율적인 운영</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              주요 지표와 업무를 한눈에 확인하세요
            </h1>
            <p className="max-w-2xl text-base text-slate-300">
              실시간 재고 현황, 예측 분석, 우선순위 작업을 한 화면에서 관리할 수 있도록 구성했습니다.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-white text-slate-900 hover:bg-white/90" variant="default">
              새 주문 생성
            </Button>
            <Button variant="secondary">재고 가져오기</Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OVERVIEW_CARDS.map((card) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur"
            >
              <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold ${card.accent}`}>
                <card.icon className="h-5 w-5" />
              </span>
              <div className="space-y-2">
                <p className="text-sm text-slate-200">{card.title}</p>
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className="text-xs text-slate-300">전월 대비 {card.change}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">업무 우선순위</h2>
              <p className="text-sm text-slate-500">예상 소모량과 임박 품목을 기준으로 정렬되었습니다.</p>
            </div>
            <Button variant="outline">전체 보기</Button>
          </header>
          <div className="space-y-4">
            {INSIGHTS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  <TrendingUp className="h-4 w-4" />
                  자동 분석 리포트
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">이번 주 일정</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-medium text-slate-900">월요일</p>
              <p>수술실 소모품 점검 및 자동 발주 확인</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">수요일</p>
              <p>주요 공급사 가격 비교 업데이트</p>
            </div>
            <div>
              <p className="font-medium text-slate-900">금요일</p>
              <p>월간 재고 감사 보고서 제출</p>
            </div>
          </div>
          <Button className="w-full" variant="default">
            일정 관리 바로가기
          </Button>
        </aside>
      </section>
    </div>
  );
}
