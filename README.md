# HyperStore - Dijital Ürün Satış Sayfası

Bu proje, Hyper Teknoloji için hazırlanmış bir teknik değerlendirme çalışmasıdır. Uygulama React ve modern frontend teknolojileri kullanılarak geliştirilmiş basit bir dijital ürün satış sayfasıdır.

## Teknolojiler ve Paketler

- React 19
- TypeScript
- Vite
- Zustand (State yönetimi)
- TanStack Query (React Query v5) (API veri yönetimi)
- Tailwind CSS v4
- Shadcn/UI (UI bileşenleri)

## Özellikler

- Fake Store API'den ürünlerin listelenmesi
- Kategorilere göre ürün filtreleme
- React Query ile optimum data fetching
- Sepete ürün ekleme, çıkarma, miktar güncelleme
- Sepet sidebar'ı
- Responsive tasarım

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleme
npm install

# Geliştirme sunucusunu başlatma
npm run dev

# Derleme için
npm run build
```

## Proje Yapısı

Projede SOLID prensipleri ve temiz kod yazım pratiğine dikkat edilmiştir:

- `src/types`: TypeScript ara yüzleri ve tipleri
- `src/store`: Zustand durum yönetimi
- `src/services`: API servisleri
- `src/hooks`: React Query custom hookları
- `src/components`: Yeniden kullanılabilir bileşenler
  - `product`: Ürün ile ilgili bileşenler
  - `cart`: Sepet ile ilgili bileşenler
- `src/layout`: Sayfa düzeni ile ilgili bileşenler

## Uygulama Mimarisi

Uygulamada tercih edilen yaklaşımlar:

1. **React Query**: API iletişimini ayrıştırmak ve veri önbelleğe alma, stale yönetimi ve async durum yönetimi için kullanılmıştır.
2. **Zustand**: Sepet durumu için client-side state yönetimi sağlar. React Query ile entegre çalışır.
3. **Shadcn/UI**: Tailwind tabanlı yeniden kullanılabilir UI bileşenleri, esnek ve özelleştirilebilir bir UI sunar.
4. **TypeScript**: Tip güvenliği ve geliştirme deneyimini iyileştirmek için kullanılmıştır.

## Not

Bu proje React 19 ile geliştirildiği için, bazı bağımlılıklar peer dependency sorunları yaşayabilir. Bu durumda `--force` bayrağını kullanarak yükleme yapılmalıdır (shadcn kurulumunda otomatik olarak yapılmaktadır).
