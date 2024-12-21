import { allItems } from './docs.item';

export enum EPath {
  'dashboard' = 'api/dashboard',
  'shop' = 'api/shop',
}
export enum EDescription {
  'dashboard' = 'Yöneticiler ve çalışanlar için iş süreçlerinin takibini kolaylaştıran kapsamlı bir backoffice modülüdür. Bu modül, raporlama ve analitik işlemlerinin yanı sıra kullanıcı yönetimi, iş akışları, performans takibi gibi operasyonel süreçlerin yönetilmesine imkan sağlar. Özellikle hizmet bazlı ve e-ticaret odaklı projelerde, bu modül tedarikçi takibi, siparişlerin yönetimi, teklifler ve ürün oluşturma gibi kritik işlevleri içerir. ',
  'shop' = 'Uygulamanın ön yüzünü yöneten ve genel kullanıcılara yönelik işlemleri kapsayan bir modüldür. Kullanıcıların uygulama ile doğrudan etkileşimde bulundukları sayfalar ve işlevler bu modülde yer alır. Bu modül, e-ticaret işlemleri başta olmak üzere, kullanıcıların ürünleri görüntülemesi, sepet yönetimi yapması ve satın alma işlemlerini tamamlaması gibi süreçleri içerir. Kullanıcı dostu bir arayüz sunarak, uygulamanın kolay ve etkili bir şekilde kullanılmasını sağlar.',
}

export const DocMenu = {
  dashboard: allItems,
  shop: allItems,
};
