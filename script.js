(function() {
  'use strict';

  const DEFAULT_DATE = 'Aug 1, 2026';
  const DEFAULT_TIME = '';
  const SCROLL_THRESHOLD = 300;

  const FILE_IDS = [
    '108nFJi7-eMMKBLRtxMRxakcvHMuhV1qk','10KfzEGWpK75Z7A78krajQKuC6shNNCpw',
    '10T6smGoPGj5SDQxyMrnpsljXkFbINQxy','118i-3lWbeKbYjHx_WLgzjol0YNdrOGIu',
    '11B56VfYIhe-4BtccfxYNP4mpH-kFJ2vK','1239MELP78qQF7XwwOuf7Nt0lkFqiLMUc',
    '12QtJo20QkKaXDAL-2j8rpVMdoWuYU18t','12d8KZK2EpQHDjCTKz0JAZlY9qC56um-u',
    '12ucKCDEsxnIfN87VevE-22VPYx6xF_uA','13AyBQoYHsWr93K1n5MQ8Qy9zCaTCFjQf',
    '13N5lNmxH1mt88DxasTCXJkYbEdElJQM-','13tsJDIifjl5OufZHmdiQTjOdPab_MpNQ',
    '14cuF_eckn7PmMmBH9d6O1b_UMTetg7u1','14gZHW3Zh_QWPcTm9sGW59m0tq0mo21vI',
    '15Cngo1H-SGdd0S6ms9Bm_WqsonlM9Rb8','15IAPZaa5DGU4IfdY4Tw91Vven9FYmCe3',
    '161OyJziZe7QBBD0k9cnQpV2HT4EgTC3k','17eOQzMHH2e9KJLLWQZvlltCmHIBzSRP_',
    '18UgtLlyU_vS1BQ_AtS5QwZM0cyNzy-eR','18XgKTrOm569iSunJ7OUsWCnI6DX1I_Q6',
    '19Nd8j5goilcyE4koV3EALFZESfa3mNob','19lmzX1ic2bYaDB3FISmk4IHGWJgF0rmA',
    '1AJKb3UNxilxJ7mCaM9f6iC7SFyMVjcpY','1AQwD8EeakSMF30s1k8Sy2jO9-DK2E03D',
    '1BHLznsmSYb2rl99OUT3LXOtYQHqIle0-','1BjgQ500GkbUeqB5Q9gYT0dTThg_2qoqX',
    '1CSFAcGE_H_DM50KeIxM-dMNFQeh1vM9J','1CTArLmZjsajTutJ0E8xSdKV_ZwZjQzWB',
    '1CnLB5W9mcWKTGGejpGDThffhqiTuNIWA','1Crvtg8N8mXO11DLC-Y3sGy1LQ0CCeDxg',
    '1CzuqKCnXLkyicAFu5P0sGwdCjOGyOnOR','1DYsuyTLM8hfLlOOayt-VQdHEvi2lqsB8',
    '1DauxfOEgJNEdf-C_L055FJkCTLDK-aE3','1DsgbUIU1uV_MNx8M4994d65zaMfwc04c',
    '1EhhMGZO8_RQarzPG6mupU48wyMqIALSm','1F4HthIkfZfrDSqVzF_0tLwqjxVcHw0Sr',
    '1FSK2vKBc-p6QmeycW910cYiYGARhCYmp','1FY6kbtDYH65UvDpBH9l_G4r_DaUO6oxI',
    '1Fdz8kCwsmHX7fDhOJZvviHzij2AlVSz4','1Fv_FJo8C9EDAzZAQdapzbAno-LmVigbm',
    '1Gd6QhUA0dNna6sY6Rqv5oVS5tWFxxBbc','1H0LSR3Wl3I61AM9iuVW99FfiyqJYpQWv',
    '1HNZH150QZKH-DEcbtEOLoACavIkXlpEz','1HWc1ttQERjNxSYdtV44e0sYAlm9Z8IAy',
    '1HmOeUatW1xMcTR__cvl5YzQPvtX-1BXs','1J2inWnK7n97Sx94wCUaKhfZ9rsR5E0BO',
    '1JLjB_2AYmQERP5H2s226rQrKdJpDnGe9','1Jv6buQQupnGFscNedOdU0CsuD1j-Lfh2',
    '1KOlGPuyeGl_hoZE0JwdVahuMZAEHDMWT','1KWHzT94chc-UYT5rtOrfPqS0klvRA_Ga',
    '1LAzd0Q6zp_TcQa9XjmRmiE5fvFyqqTvy','1Mctb8YPKcr_yG96460lunfmCppY3znkZ',
    '1MsdZXEDYK8hwzmzuJ-FjLxShcklhmcr0','1MzUUCz0T0QRGuiBJDVUyCN_u-fFa377T',
    '1NTbGLgmo4hbUi26MsaF08_5Ei7DRalNa','1QQsxTWZZJVjEgfExnAk-ROq2o7zIBTJR',
    '1RyrEaGbrtCBI4y1lx9NvVPTYvtMd-vxq','1S5HGKmQbkmN_DW1oQCJWFNuxhXSDwTDH',
    '1TeuPuvNhJE_qbLZr1lI8jeoFOk4fHchB','1UIx__RenagWdrqYZDA4219VM-D86Ubkd',
    '1Uh0qAt9Y2saqqJm8JZTouydicqXTItTL','1UjschU4iBBw2uBQjSwjQv8tCzZQ6GCrR',
    '1WSsMGvVp1vWhdhYwy6lNPv_vFm7GOZk_','1WnUZmtdfyhqqMbeU3MJ8Rn-UfZGpBE09',
    '1XCqUW-mBlKxDY0o9ARkiLHuA6Z5SELZa','1XXarQHHAy4xyngvfeO43AGHkDWKu5-4z',
    '1Y3SRJz1WKbNdZppIZfyn2tnoe8Ynfess','1YcCuKgRFXab8tkYxHDMA9kBcCQy3FBMB',
    '1Z0AYXFLh3PHCuv-0g-UPfa7IbkfIDtjB','1ZZCD25HXoHZsGup_io8MlqX8Onx5xBF2',
    '1Zyft5A18wOnM23-MX0Yr-sOMG4sACsrv','1ZzdyB7CZT78Nh9ir1uMQTP3IRHBLBr8f',
    '1_MdFm66YlOn9f2s7lynSbbfCgIOrKDv7','1aeFKlHPkYE3TbHGjhKE4Pp7SlmBTNhpU',
    '1bTamlUvbxnG_zfz-mq--uiyBXtfFi5Gs','1b_z7yk9jF_cnRDnVElcGXt3uDrgAn22-',
    '1bvBLa7wRELL6eNTlOScQfeBsEZEeJK6B','1c1Ed7rn5PB7QwdwEsnSuMfCp-LqQk4is',
    '1c7MtUBHVwttfZQsjdE4pYR-KxxMPDgOJ','1cFrPPttgf6nhGjsVElfG1m5-tDFXI0Pz',
    '1d8sTAtRYJ5yAXBAnR5y21dZC6MvIQa9C','1dWlDBAjBVC2BGVl9X5g3jCmwypceCmYW',
    '1diRSHo4cQmVRb9xmZ4qB3OLNA3I7zDXm','1e_iN7cGTo03uaPCCo7sNlaxnMy0Jkvzu',
    '1ejLTZp-3Z0SeVldqVGuIOsI_Vb17OaQ8','1fDRsmXmpIJ81EhTbTAwQZquUeStZADuv',
    '1ftBYGoYAO-hMxW801XzGHBsW8Cgkg7SG','1gwuEaApwPI0KsUeQrYce4q0qDY2c2UVB',
    '1hXGu6GOMJ72Szha9OSLzOpCIGGiUmcAR','1hjgWPCOjS3FmoStjMFzRQFCPIS1XJT5p',
    '1j1pvkPWOIE0rsA1BWmBFJHrPW-v9YsQN','1jOaWGy0JoC3R7nfLfzua4QtjX_Oj-aTZ',
    '1jyTKaHYyBhLkXdBlrBzxB4srzsSCIyVh','1m48UVrv2Q7IMP8cpb8qSceSM4seLrK6c',
    '1mL3fEoYtk0aBku3vfe9uA62o28u3G8d8','1nC1LIrvOS3s7DvxHdtvmFwDyOJBl2Ywq',
    '1osrhCFrrrFMFzosm-zANqVOwo2Iqu_AI','1ovCun7ukOeU6_X_q4i9YVoLWMKRKapnZ',
    '1p74Z2lSMMB22ze0RjT17sONVVZZjNWey','1pfXnQymtgGm9e8eMVAWacn6Vl9beeXz7',
    '1qTmG2-OS_X8u06RA1Bp2MKhyZNv-uKYi','1qYSLsZ_Z2u30ommKA9NGtaXsxq54itp5',
    '1qjnCAr2AKwan2NsJu4U6WnWcsf5RjK5e','1qmAGIBsAgChD3LXQltHcOCHbnmhs4ZhX',
    '1rbFfB0OjwUReVulwn5daQIOcM16EuSzj','1s-rHKS2DWZFiTrnQvZZfcUzgApbn-pbo',
    '1t7ursX6zXJrP__ei6K_TB_0rHcdkSvaB','1thBxUHcGo7Cdhv8q907ivwZu_jBB9GAp',
    '1tyXUFSYzaMKqsC1cJPKwwzsDRUMng8Iv','1uQfmDEBd67bgKJofLU6nVnKRi5dgMFJu',
    '1vrodsOAF7V8S5uofTDk4BgcbajaNqVT8','1w2Jdwyze5utzfF465VvBemgWjiY3Gk3g',
    '1wBn3zDXkhIIy6LlOqH4gfLy2JzjMVWtc','1x8A65gmRkGsG0j_5RO-MpFTnjpEE9VJs',
    '1xGFxh3qfvTJW4-IOUy76U9FoIL-JOtjt','1yFStksznHDhtZFK1TDrewtExnHD3n6FM',
    '1zN3xFu01H8G05mdwJqrM08fsvAxQOekL'
  ];

  let photos = FILE_IDS.map((fileId, index) => ({
    id: fileId,
    url: `https://lh3.googleusercontent.com/d/${fileId}=w1200`,
    thumbUrl: `https://lh3.googleusercontent.com/d/${fileId}=w400`,
    name: `Photo ${index + 1}`,
    date: DEFAULT_DATE,
    time: DEFAULT_TIME,
    hasExifTime: false,
    aspectRatio: 4/3
  }));

  const statusBar = document.getElementById('statusBar');
  const mosaic = document.getElementById('mosaic');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const slideshowView = document.getElementById('slideshowView');
  const galleryView = document.getElementById('galleryView');
  const slideshowSlides = document.getElementById('slideshowSlides');
  const slideshowInfo = document.getElementById('slideshowInfo');
  const slideshowPrev = document.getElementById('slideshowPrev');
  const slideshowNext = document.getElementById('slideshowNext');
  const slideshowCurrentNum = document.getElementById('slideshowCurrentNum');
  const slideshowTotalNum = document.getElementById('slideshowTotalNum');
  const slideshowPlayBtn = document.getElementById('slideshowPlayBtn');
  const slideshowCloseBtn = document.getElementById('slideshowCloseBtn');
  const tapZoneLeft = document.getElementById('tapZoneLeft');
  const tapZoneRight = document.getElementById('tapZoneRight');

  let slideshowActive = false;
  let slideshowPlaying = false;
  let currentSlideshowIndex = 0;
  let slideshowInterval = null;
  const SLIDESHOW_INTERVAL_MS = 4000;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function preloadImages(photoList) {
    return Promise.all(photoList.map(photo => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          photo.aspectRatio = img.naturalWidth / img.naturalHeight;
          resolve(photo);
        };
        img.onerror = () => {
          photo.aspectRatio = 4/3;
          resolve(photo);
        };
        img.src = photo.thumbUrl;
      });
    }));
  }

  function buildSlideshow() {
    slideshowSlides.innerHTML = '';
    photos.forEach((photo, index) => {
      const slide = document.createElement('div');
      slide.className = 'slideshow-slide';
      if (index === currentSlideshowIndex) slide.classList.add('active');

      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = `Photo ${index + 1}`;
      img.loading = 'lazy';

      slide.appendChild(img);
      slideshowSlides.appendChild(slide);
    });
    slideshowTotalNum.textContent = photos.length;
    updateSlideshowInfo();
  }

  function updateSlideshowInfo() {
    const photo = photos[currentSlideshowIndex];
    const dateUpper = (photo.date || '').toUpperCase();
    const timeStr = photo.time || '';

    if (timeStr) {
      slideshowInfo.innerHTML = `
        <div class="datetime-row">
          <span class="photo-date">${dateUpper}</span>
          <span class="datetime-sep">•</span>
          <span class="photo-time">${timeStr}</span>
        </div>
      `;
    } else {
      slideshowInfo.innerHTML = `
        <div class="datetime-row">
          <span class="photo-date">${dateUpper}</span>
        </div>
      `;
    }
    slideshowCurrentNum.textContent = currentSlideshowIndex + 1;

    const slides = slideshowSlides.querySelectorAll('.slideshow-slide');
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlideshowIndex);
    });
  }

  function goToSlideshowSlide(index) {
    currentSlideshowIndex = (index + photos.length) % photos.length;
    updateSlideshowInfo();
  }

  function startSlideshowAutoPlay() {
    slideshowPlaying = true;
    slideshowPlayBtn.classList.add('playing');
    slideshowInterval = setInterval(() => {
      goToSlideshowSlide(currentSlideshowIndex + 1);
    }, SLIDESHOW_INTERVAL_MS);
  }

  function pauseSlideshowAutoPlay() {
    slideshowPlaying = false;
    slideshowPlayBtn.classList.remove('playing');
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  function toggleSlideshowPlayPause() {
    if (slideshowPlaying) {
      pauseSlideshowAutoPlay();
    } else {
      startSlideshowAutoPlay();
    }
  }

  function openSlideshow(startIndex) {
    currentSlideshowIndex = startIndex;
    slideshowActive = true;
    slideshowView.classList.add('active');
    galleryView.style.display = 'none';
    document.body.style.overflow = 'hidden';
    buildSlideshow();
    pauseSlideshowAutoPlay();
  }

  function closeSlideshow() {
    slideshowActive = false;
    pauseSlideshowAutoPlay();
    slideshowView.classList.remove('active');
    galleryView.style.display = '';
    document.body.style.overflow = '';
  }

  slideshowPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSlideshowPlayPause();
  });

  slideshowCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSlideshow();
  });

  slideshowPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlideshowSlide(currentSlideshowIndex - 1);
    if (slideshowPlaying) resetSlideshowTimer();
  });

  slideshowNext.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlideshowSlide(currentSlideshowIndex + 1);
    if (slideshowPlaying) resetSlideshowTimer();
  });

  tapZoneLeft.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlideshowSlide(currentSlideshowIndex - 1);
    if (slideshowPlaying) resetSlideshowTimer();
  });

  tapZoneRight.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlideshowSlide(currentSlideshowIndex + 1);
    if (slideshowPlaying) resetSlideshowTimer();
  });

  function resetSlideshowTimer() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = setInterval(() => {
        goToSlideshowSlide(currentSlideshowIndex + 1);
      }, SLIDESHOW_INTERVAL_MS);
    }
  }

  function extractExifData(imgElement) {
    return new Promise((resolve) => {
      try {
        if (typeof EXIF === 'undefined') {
          resolve(null);
          return;
        }
        EXIF.getData(imgElement, function() {
          const dateTime = EXIF.getTag(this, 'DateTimeOriginal')
                        || EXIF.getTag(this, 'DateTime')
                        || EXIF.getTag(this, 'DateTimeDigitized');
          if (dateTime) {
            const parts = dateTime.split(' ');
            if (parts.length >= 2) {
              const dateParts = parts[0].split(':');
              const timeParts = parts[1].split(':');
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              const monthIdx = parseInt(dateParts[1], 10) - 1;
              const date = `${months[monthIdx]} ${parseInt(dateParts[2], 10)}, ${dateParts[0]}`;
              let hours = parseInt(timeParts[0], 10);
              const minutes = parseInt(timeParts[1], 10);
              const ampm = hours >= 12 ? 'PM' : 'AM';
              const hours12 = hours % 12 || 12;
              const time = `${hours12}:${String(minutes).padStart(2, '0')} ${ampm}`;
              resolve({ date, time });
              return;
            }
          }
          resolve(null);
        });
      } catch (e) {
        resolve(null);
      }
    });
  }

  function renderGallery() {
    statusBar.style.display = 'none';
    mosaic.innerHTML = '';

    photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.style.animationDelay = `${Math.min(index * 0.03, 1.5)}s`;
      card.dataset.photoId = photo.id;

      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.src = photo.thumbUrl;
      img.alt = `Photo ${index + 1}`;
      img.loading = 'lazy';

      const overlay = document.createElement('div');
      overlay.className = 'photo-overlay';

      const dateEl = document.createElement('div');
      dateEl.className = 'photo-date';
      dateEl.textContent = photo.date;

      const timeEl = document.createElement('div');
      timeEl.className = 'photo-time';
      timeEl.textContent = photo.time;
      if (!photo.time) timeEl.style.display = 'none';

      overlay.appendChild(dateEl);
      overlay.appendChild(timeEl);

      card.appendChild(img);
      card.appendChild(overlay);

      img.addEventListener('load', async () => {
        const exifData = await extractExifData(img);
        if (exifData) {
          dateEl.textContent = exifData.date;
          photo.date = exifData.date;
          if (exifData.time) {
            timeEl.textContent = exifData.time;
            photo.time = exifData.time;
            timeEl.style.display = '';
          }
        } else {
          dateEl.textContent = DEFAULT_DATE;
          photo.date = DEFAULT_DATE;
          if (!photo.time) {
            timeEl.style.display = 'none';
          }
        }
      });

      img.addEventListener('error', () => {
        dateEl.textContent = DEFAULT_DATE;
        timeEl.style.display = 'none';
      });

      card.addEventListener('click', () => {
        const actualIndex = photos.findIndex(p => p.id === photo.id);
        if (actualIndex >= 0) {
          openSlideshow(actualIndex);
        }
      });

      mosaic.appendChild(card);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (slideshowActive) {
      if (e.key === 'ArrowLeft') {
        goToSlideshowSlide(currentSlideshowIndex - 1);
        if (slideshowPlaying) resetSlideshowTimer();
      } else if (e.key === 'ArrowRight') {
        goToSlideshowSlide(currentSlideshowIndex + 1);
        if (slideshowPlaying) resetSlideshowTimer();
      } else if (e.key === 'Escape') {
        closeSlideshow();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleSlideshowPlayPause();
      }
      return;
    }
  });

  function updateCountdown() {
    const now = new Date();
    let target = new Date(now.getFullYear(), 7, 31, 0, 0, 0);
    if (now >= target) {
      target = new Date(now.getFullYear() + 1, 7, 31, 0, 0, 0);
    }

    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const canvas = document.getElementById('effectsCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  const MY_COLORS = ['#CC0001', '#FFFFFF', '#010066', '#FC0', '#FF4444', '#FFD700'];

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Snowflake {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : -10;
      this.r = Math.random() * 2.5 + 0.8;
      this.vy = Math.random() * 0.6 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.color = MY_COLORS[Math.floor(Math.random() * 4)];
      this.opacity = Math.random() * 0.5 + 0.3;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
    }
    update() {
      this.sway += this.swaySpeed;
      this.x += this.vx + Math.sin(this.sway) * 0.3;
      this.y += this.vy;
      if (this.y > H + 10 || this.x < -10 || this.x > W + 10) {
        this.reset(false);
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  class FireworkParticle {
    constructor(x, y, color, speedMult) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 3 + 1.5) * (speedMult || 1);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.decay = Math.random() * 0.012 + 0.008;
      this.color = color;
      this.r = Math.random() * 2 + 1;
      this.glow = Math.random() * 8 + 4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.025;
      this.vx *= 0.99;
      this.life -= this.decay;
    }
    draw() {
      if (this.life <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glow * this.life, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.life * 0.3;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  class Firework {
    constructor(x, y, color, sizeMult) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.particles = [];
      const count = Math.floor((Math.random() * 40 + 50) * (sizeMult || 1));
      for (let i = 0; i < count; i++) {
        this.particles.push(new FireworkParticle(this.x, this.y, this.color, sizeMult));
      }
      this.alive = true;
    }
    update() {
      this.particles.forEach(p => p.update());
      this.particles = this.particles.filter(p => p.life > 0);
      if (this.particles.length === 0) this.alive = false;
    }
    draw() { this.particles.forEach(p => p.draw()); }
  }

  const snowflakes = [];
  const snowCount = Math.min(Math.floor(W * H / 15000), 80);
  for (let i = 0; i < snowCount; i++) {
    snowflakes.push(new Snowflake());
  }

  const fireworks = [];
  let fireworkTimer = 0;
  let nextFireworkIn = 60;

  function spawnFirework(zone) {
    let x, y;
    const margin = W * 0.1;

    if (zone === 'header') {
      x = margin + Math.random() * (W - margin * 2);
      y = H * 0.08 + Math.random() * H * 0.15;
    } else if (zone === 'footer') {
      x = margin + Math.random() * (W - margin * 2);
      y = H * 0.78 + Math.random() * H * 0.15;
    } else {
      x = margin + Math.random() * (W - margin * 2);
      y = H * 0.3 + Math.random() * H * 0.4;
    }

    const color = MY_COLORS[Math.floor(Math.random() * MY_COLORS.length)];
    const sizeMult = 0.8 + Math.random() * 0.6;
    fireworks.push(new Firework(x, y, color, sizeMult));
  }

  function animateEffects() {
    ctx.clearRect(0, 0, W, H);

    snowflakes.forEach(s => {
      s.update();
      s.draw();
    });

    fireworkTimer++;

    if (fireworkTimer >= nextFireworkIn) {
      const rand = Math.random();
      if (rand < 0.35) {
        spawnFirework('header');
      } else if (rand < 0.7) {
        spawnFirework('footer');
      } else {
        spawnFirework('middle');
      }

      if (Math.random() < 0.3) {
        setTimeout(() => spawnFirework(Math.random() < 0.5 ? 'header' : 'footer'), 200);
      }

      fireworkTimer = 0;
      nextFireworkIn = Math.floor(Math.random() * 40 + 30);
    }

    fireworks.forEach(fw => {
      fw.update();
      fw.draw();
    });

    for (let i = fireworks.length - 1; i >= 0; i--) {
      if (!fireworks[i].alive) {
        fireworks.splice(i, 1);
      }
    }

    requestAnimationFrame(animateEffects);
  }

  animateEffects();

  preloadImages(photos).then(() => {
    renderGallery();
  }).catch(() => {
    renderGallery();
  });

})();