YouTube Clone Projesi.
Bu proje, YouTube Clone olarak adlandırılan bir React tabanlı web uygulamasıdır. Uygulama, kullanıcıların video içeriklerini izleyebilecekleri, beğenebilecekleri ve yorum yapabilecekleri bir video paylaşım platformu olarak geliştirilmiştir. Proje, kullanıcı deneyimini zenginleştirmek ve modern web standartlarına uygun bir platform sunmak amacıyla çeşitli API'ler, React hook'ları, Redux ve diğer modern web geliştirme teknolojilerini kullanmaktadır.

İçindekiler:
# Kurulum
# Kullanılan Teknolojiler
# API Kullanımı
# React ve Redux Kullanımı
# Proje Yapısı
# Özellikler

# Kurulum:
Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edebilirsiniz:
1. Depoyu klonlayın:
git clone https://github.com/kullanici/youtube-clone.git
cd youtube-clone

2. Gerekli paketleri yükleyin:
npm install

3. Uygulamayı başlatın:
npm start

# Kullanılan Teknolojiler:
Bu proje, modern web geliştirme araçlarını ve teknolojilerini kullanarak zengin ve dinamik bir kullanıcı deneyimi sunmayı amaçlamaktadır. İşte projede kullanılan başlıca teknolojiler ve her birinin ayrıntılı açıklaması:

1. React
React, kullanıcı arayüzleri oluşturmak için kullanılan popüler bir JavaScript kütüphanesidir. Facebook tarafından geliştirilen ve bakım yapılan React, bileşen tabanlı mimarisi sayesinde yeniden kullanılabilir UI bileşenleri oluşturmayı kolaylaştırır. Bu projede React, kullanıcı arayüzlerini dinamik ve verimli bir şekilde yönetmek için kullanılmaktadır. Özellikle, bileşenler arasında veri akışını sağlamak ve UI durumunu güncellemek için React'in güçlü özelliklerinden faydalanılmıştır.

2. Redux
Redux, JavaScript uygulamaları için öngörülebilir bir durum yönetim kütüphanesidir. Uygulama durumunu merkezi bir depoda tutarak bileşenler arasında veri paylaşımını ve yönetimini kolaylaştırır. Bu projede Redux, kullanıcı kimlik doğrulama durumu, video listeleri ve kullanıcı etkileşimleri gibi global durumların yönetilmesi için kullanılmıştır. Redux'un kullanılması, uygulamanın daha ölçeklenebilir ve bakımının daha kolay olmasını sağlamıştır.

3. Firebase
Firebase, Google tarafından sağlanan ve web ile mobil uygulamalar için bulut tabanlı bir platformdur. Firebase, gerçek zamanlı veri tabanı, kullanıcı kimlik doğrulama, barındırma ve daha birçok hizmet sunar. Bu projede Firebase, kullanıcıların kimlik doğrulama işlemlerini gerçekleştirmek ve geri bildirim verilerini saklamak için kullanılmıştır. Firebase Authentication, kullanıcıların güvenli bir şekilde giriş yapmasını ve hesaplarını yönetmesini sağlar.

4. SASS
SASS (Syntactically Awesome Stylesheets), CSS'i daha verimli ve sürdürülebilir bir şekilde yazmayı sağlayan bir CSS önişlemcisidir. SASS, değişkenler, iç içe geçmiş kurallar, mixin'ler ve daha birçok gelişmiş özellik sunarak CSS yazımını kolaylaştırır. Bu projede SASS, stil dosyalarının daha modüler ve bakımı kolay bir şekilde yazılmasını sağlamak için kullanılmıştır.

5. React Router
React Router, tek sayfa uygulamalarında (SPA) yönlendirme işlemlerini gerçekleştirmek için kullanılan bir kütüphanedir. Kullanıcıların uygulama içinde farklı sayfalara geçiş yapmasını ve URL'ler üzerinden gezinmesini sağlar. Bu projede React Router, ana sayfa, video izleme sayfası ve diğer bileşenler arasında geçiş yapmak için kullanılmıştır. React Router sayesinde uygulamanın navigasyonu kullanıcı dostu ve hızlı bir şekilde yönetilmektedir.

6. Axios
Axios, API istekleri yapmak için kullanılan bir HTTP istemcisidir. Promise tabanlı yapısı sayesinde asenkron işlemleri yönetmeyi kolaylaştırır. Bu projede Axios, YouTube Data API ve diğer API'lerle iletişim kurarak veri almak ve göndermek için kullanılmıştır. Axios'un esnek ve güçlü yapısı, API isteklerinin yönetimini ve hata yakalamayı kolaylaştırmıştır.

# API Kullanımı:
Projede kullanılan API'ler, kullanıcıların video içeriklerini görüntülemelerini, aramalarını ve ilgili videoları bulmalarını sağlar. Bu API'ler, YouTube Data API'si kullanılarak gerçekleştirilir. API'den alınan veriler, uygulama içinde çeşitli bileşenlerde kullanılır.
Örnek API kullanımı:

import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (searchQuery) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: 'snippet',
      maxResults: 25,
      q: searchQuery,
      key: API_KEY,
    },
  });
  return response.data.items;
};

# React ve Redux Kullanımı
Proje boyunca React ve Redux, kullanıcı arayüzünü ve durum yönetimini sağlamak için kapsamlı bir şekilde kullanılmıştır.

React Hook'ları
Projede kullanılan bazı önemli React hook'ları şunlardır:
useState: Bileşen durumu yönetimi için kullanılır.
useEffect: Yan etkileri yönetmek için kullanılır.
useDispatch: Redux eylemlerini göndermek için kullanılır.
useSelector: Redux durumunu okumak için kullanılır.

Redux Kullanımı
Redux, uygulamanın global durumunu yönetmek için kullanılır. Örneğin, kullanıcı oturum durumu ve video listesi gibi durumlar Redux aracılığıyla yönetilir.

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

# Proje Yapısı
Bu projede, çeşitli işlevleri yerine getirmek için farklı dosya ve dizinler kullanılmıştır. İşte projedeki ana dosya ve dizin yapısı ve her birinin ne amaçla kullanıldığına dair detaylı açıklamalar:

1. /src
/src dizini, projenin ana kaynak dosyalarını içerir. Bu dizin, uygulamanın tüm bileşenlerini, ekranlarını, redux yapılarını ve stil dosyalarını barındırır.

2. /components
/components dizini, uygulamanın tekrar kullanılabilir bileşenlerini içerir. Bu bileşenler, uygulamanın farklı yerlerinde kullanılabilen, modüler ve bağımsız parçalardır.

Header.jsx: Uygulamanın üst kısmında yer alan başlık bileşeni. Bu bileşen, uygulamanın logo, arama çubuğu ve profil menüsü gibi öğelerini içerir.
Sidebar.jsx: Uygulamanın sol kısmında yer alan yan menü bileşeni. Bu bileşen, kullanıcıların farklı sayfalara ve kategorilere kolayca erişebilmeleri için bağlantılar içerir.

3. /screens
screens dizini, uygulamanın farklı ekranlarını veya sayfalarını içerir. Her ekran, belirli bir işlevi yerine getirir ve kullanıcı etkileşimlerine göre farklı içerikler gösterir.

HomeScreen.jsx: Ana ekran bileşeni. Bu bileşen, kullanıcıların uygulamayı açtıklarında gördükleri ana içerik sayfasını temsil eder. Genellikle önerilen videolar ve popüler içerikler bu ekranda gösterilir.
VideoScreen.jsx: Video izleme ekranı bileşeni. Bu bileşen, seçilen videonun detaylı olarak izlendiği ve ilgili bilgilerin gösterildiği sayfayı temsil eder.

4. /redux
/redux dizini, uygulamanın durum yönetimi ile ilgili dosyalarını içerir. Redux, uygulamanın global durumunu yönetmek için kullanılan bir kütüphanedir.
/actions
videoActions.js: Video ile ilgili eylemleri (actions) tanımlayan dosya. Bu dosya, videoların yüklenmesi, oynatılması gibi işlemleri başlatan eylemleri içerir.
/reducers
videoReducer.js: Video ile ilgili durumları (state) yöneten dosya. Bu dosya, eylemlere göre durumun nasıl değişeceğini tanımlar.
store.js: Redux store'unu oluşturan dosya. Bu dosya, uygulamanın tüm redux durumlarını bir arada tutar ve bileşenlerin bu duruma erişmesini sağlar.

# /styles
/styles dizini, uygulamanın stil dosyalarını içerir. Bu dosyalar, uygulamanın görünümünü ve düzenini belirler.

base.scss: Uygulamanın genel stil ayarlarını ve temel düzenlemelerini içeren dosya. Genellikle renkler, fontlar ve genel stil kuralları burada tanımlanır.
header.scss: Header bileşenine özgü stil ayarlarını içeren dosya. Bu dosya, header bileşeninin görünümünü ve düzenini belirler.
Diğer Dosyalar
App.js: Uygulamanın ana bileşeni. Bu bileşen, uygulamanın genel yapısını ve yönlendirmelerini içerir.
index.js: Uygulamanın giriş noktası. Bu dosya, React uygulamasını DOM'a render eder ve tüm uygulamayı başlatır.


# Özellikler
Bu proje, kullanıcıların YouTube benzeri bir deneyim yaşayabileceği zengin ve çeşitli özellikler sunmaktadır. İşte projede bulunan başlıca özellikler ve her birinin ayrıntılı açıklaması:

1. Video İzleme
Video İzleme: Kullanıcılar, platformda mevcut olan video içeriklerini kesintisiz bir şekilde izleyebilirler. Video oynatma, durdurma, ileri/geri sarma gibi temel medya kontrolleri mevcuttur. Ayrıca, videoların kalitesi ve oynatma hızı gibi ayarlar kullanıcı tercihine göre ayarlanabilir.

2. Video Arama
Video Arama: Kullanıcılar, belirli anahtar kelimeleri kullanarak platformda bulunan videolar arasında arama yapabilirler. Arama sonuçları, kullanıcının girdiği anahtar kelimelerle eşleşen videoları listeler ve kullanıcıların aradıkları içeriğe hızlıca ulaşmalarını sağlar.

3. Yorum Yapma ###(Bu xüsusiyyət hələ ki, mövcud deyil.)###
Yorum Yapma: Kullanıcılar, izledikleri videolar hakkında yorum yapabilirler. Yorumlar, kullanıcıların düşüncelerini, geri bildirimlerini ve videolarla ilgili tartışmalarını paylaşabilecekleri etkileşimli bir alan sunar. Yorumlar gerçek zamanlı olarak güncellenir ve diğer kullanıcılar tarafından görülebilir.

4. Beğenme/Beğenmeme ###(Bu xüsusiyyət hələ ki, mövcud deyil.)###
Beğenme/Beğenmeme: Kullanıcılar, izledikleri videoları beğenebilir veya beğenmeyebilirler. Bu özellik, kullanıcıların izledikleri içerik hakkında geri bildirim vermelerini sağlar ve videoların popülerliğini ölçmeye yardımcı olur. Beğenme ve beğenmeme sayıları videonun altında görüntülenir.

5. Kullanıcı Girişi
Kullanıcı Girişi: Firebase Authentication ile kullanıcılar güvenli bir şekilde giriş yapabilir ve hesap oluşturabilirler. Bu özellik, kullanıcıların kişisel profillerini yönetmelerine ve özel özelliklere erişmelerine olanak tanır. Giriş yapmayan kullanıcılar, bazı özelliklere erişim kısıtlamasıyla karşılaşabilirler.

6. Karanlık Mod ve Aydınlık Mod ###(Bu xüsusiyyət hələ ki, mövcud deyil.)###
Karanlık Mod ve Aydınlık Mod: Kullanıcılar, arayüzün görünümünü tercihlerine göre değiştirebilirler. Karanlık mod, düşük ışıklı ortamlarda göz yorgunluğunu azaltırken, aydınlık mod daha parlak ve canlı bir görünüm sunar. Kullanıcılar, bu modlar arasında kolayca geçiş yapabilirler.

7. Dinamik Profil Avatarı
Dinamik Profil Avatarı: Kullanıcı avatarları dinamik olarak gösterilir ve kullanıcı profiline göre güncellenir. Kullanıcı avatarına tıklanarak bir menü açılır ve bu menüde profil ayarları, çıkış yapma gibi seçenekler bulunur. Bu özellik, kullanıcı deneyimini kişiselleştirmeye yardımcı olur.

8. Google API'leri Entegrasyonu
Google API'leri Entegrasyonu: Proje, videolar ve kullanıcı bilgileri gibi verileri almak için Google API'lerini kullanır. Özellikle YouTube Data API, kullanıcıların videoları aramasını ve izlemesini sağlayan temel veri kaynağıdır. Bu entegrasyon, platformun geniş veri havuzuna erişimini sağlar ve kullanıcıların ihtiyaç duydukları içeriği bulmalarını kolaylaştırır.

9. Feedback Modal
Feedback Modal: Kullanıcılar, uygulama hakkında geri bildirimde bulunabilirler. Açılan modal penceresinde kullanıcı adı, soyadı, geri bildirimin konusu, e-posta adresi ve geri bildirim içeriği gibi bilgiler girilebilir. Gönderilen geri bildirimler, kullanıcıların belirttiği e-posta adresine gönderilir ve bu sayede geri bildirimlerin takibi yapılabilir.

