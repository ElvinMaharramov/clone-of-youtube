import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Container } from 'react-bootstrap';

import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import NotFound from './screens/notFound/NotFound';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';
import LikedVideosScreen from './screens/likedVideosScreen/LikedVideosScreen';
import FeedbackModal from './components/feedbackModal/FeedbackModal';

import './app.scss';

const Layout = ({ children }) => {
  /* Layout componenti, uygulamanızın genel düzenini tanımlayan bir wrapper(sarıcı) componenttir.
  İçinde Header, SideBar ve Container gibi yapısal componentler barındırır.
  Bu component, diğer componentleri içine alarak uygulamanızın tutarlı bir düzen içerisinde çalışmasını sağlar. */

  /* children prop'u, React'te özel bir prop'tur ve Layout componentine geçirilen içeriği temsil eder.
  Yani, Layout componenti içerisine başka componentler veya JSX kodları yerleştirildiğinde,
  bu içerikler children prop'u aracılığıyla Layout componentinin belirli bir yerine eklenir.
  Bu, daha modüler ve esnek bir yapı oluşturmanıza olanak tanır. */

  /* Neden App Componentinde Değil de Layout Componentinde Kullanım?
  
  Tekrar Kullanılabilirlik: Layout componenti, uygulamanızın genel düzenini ve yapısını tanımlar.
  Bu sayede, aynı düzeni tekrar tekrar kullanmanız gerektiğinde sadece Layout componentini kullanarak
  aynı düzeni koruyabilirsiniz.
  
  Modülerlik: Layout componenti, uygulamanızın farklı bölümlerini(örneğin Header, SideBar, Container)
  ayrı ayrı tanımlayıp yönetmenizi sağlar. Bu, kodunuzu daha modüler ve yönetilebilir hale getirir.
  
  Esneklik: children prop'u sayesinde, Layout componenti içerisine farklı componentler yerleştirerek esnek bir yapı
  oluşturabilirsiniz. Bu, farklı sayfalar veya bölümler arasında tutarlı bir kullanıcı arayüzü sağlar. */


  const [toggleSideBar, setToggleSideBar] = useState(false);

  const handleToggleSideBar = () => setToggleSideBar(prevState => !prevState);

  return (
    <>

      <Header handleToggleSideBar={handleToggleSideBar} />
      <div className='app-container'>
        <SideBar
          toggleSideBar={toggleSideBar}
          handleToggleSideBar={handleToggleSideBar}
        />
        <Container fluid className='app-main'>
          {children}
        </Container>
      </div>

    </>
  )
}

const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeedbackSubmit = (formData) => {
    console.log('Feedback submitted:', formData);
    // Form verilerini işleyin (örneğin, API'ye gönderin)
  };

  const navigate = useNavigate();

  const { accessToken, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/auth')
    }
  }, [accessToken, loading, navigate]);


  return (

    /* React Router'ın önceki sürümlerinde (v5 ve daha önceki sürümler), rotaları eşleştirmek için "exact" prop'u ve
    rotaları sarmalamak için "Switch" bileşeni kullanılıyordu. Ancak, React Router v6'da bazı önemli değişiklikler ve
    geliştirmeler yapıldı. 
    
    1. "exact" Prop'u:
       "exact" prop'u, bir rotanın tam eşleşmesini zorunlu kılar.
       Örneğin, /about rotası, /about/team gibi alt yollarla da eşleşebilir. "exact" prop'u kullanıldığında
       sadece /about rotası tam olarak eşleşir.
       
    2. "Switch" Bileşeni:
        "Switch" bileşeni, içindeki rotaların yalnızca bir tanesinin render edilmesini sağlar.
        İlk eşleşen rotayı bulur ve onu render eder, diğerlerini atlar:
        const App = () => (
          <Router>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/about" component={AboutScreen} />
            </Switch>
          </Router>
        ); 

    React Router v6'da Yenilikler:

    1. "exact" Prop'u Kaldırıldı:
       React Router v6'da tüm rotalar varsayılan olarak tam eşleşme(exact match) yapar.
       Bu yüzden exact prop'unu kullanmanıza gerek kalmaz.

    2. "Switch" Yerine "Routes":
      Switch bileşeni kaldırıldı ve yerine Routes bileşeni geldi.
      Routes, Switch gibi çalışır ve içindeki rotaların yalnızca bir tanesinin render edilmesini sağlar.

    3. Yeni "Route" Kullanımı:
       "Route" bileşeninde "component" yerine "element" prop'u kullanılır.
       "element" prop'u, JSX öğelerini kabul eder. 
       
    "exact": Artık kullanılmıyor, tüm rotalar varsayılan olarak tam eşleşme yapıyor.
    "Switch": Yerine "Routes" bileşeni kullanılıyor.
    "component": Yerine "element" prop'u kullanılıyor.
    Yeni Özellikler: React Router v6, daha basit ve anlaşılır bir yapı sunuyor, bu da kodunuzu daha temiz ve
    yönetilebilir hale getiriyor. */
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <HomeScreen />
            </Layout>
          }
        />
        <Route
          path='/auth'
          element={
            <Layout>
              <LoginScreen />
            </Layout>
          }
        />

        <Route
          path='/search/:query'
          element={
            <Layout>
              <SearchScreen />
            </Layout>
          }
        />

        <Route
          path='/watch/:id'
          element={
            <Layout>
              <WatchScreen />
            </Layout>
          }
        />

        <Route
          path='/feed/subscriptions'
          element={
            <Layout>
              <SubscriptionsScreen />
            </Layout>
          }
        />

        <Route
          path='/channel/:channelId'
          element={
            <Layout>
              <ChannelScreen />
            </Layout>
          }
        />

        <Route
          path='/liked'
          element={
            <Layout>
              <LikedVideosScreen />
            </Layout>
          }
        />

        <Route
          path='/feedback'
          element={
            <Layout>
              <FeedbackModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSubmit={handleFeedbackSubmit}
              />
            </Layout>
          }
        />

        <Route
          path='*'
          /* path='*' rotası, yukarıdaki belirli rotalarla eşleşmeyen tüm URL'ler için NotFound bileşenini gösterir.
          Bu, "catch-all" route olarak bilinir ve her zaman diğer rotalardan sonra gelmelidir. */
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </>
  )
}

export default App;