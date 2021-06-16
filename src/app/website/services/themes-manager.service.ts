import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title, Meta, DomSanitizer, TransferState, makeStateKey } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators'
import { MetaTag } from '../../website/models/meta.model';
import { Router } from '@angular/router';
import * as firebase from "firebase"
import { environment } from 'src/environments/environment';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ConfigService } from 'src/app/services/config.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ThemesManagerService {
  testingMode = environment.testing
  isBrowser
  domainName = ""
  customDomain = ""
  shareLink = ""
  data: any
  gallery = []
  carousel = []
  services = []
  products = []
  keypoints = []
  allCategories = []
  videos = []
  videosAllId = []
  embedUrl = []
  secureVideoLinks = []
  id: any
  testimonials = []
  private urlMeta: string = "og:url";
  private titleMeta: string = "og:title";
  private descriptionMeta: string = "og:description";
  private imageMeta: string = "og:image";
  private secureImageMeta: string = "og:image:secure_url";
  private twitterTitleMeta: string = "twitter:text:title";
  private twitterImageMeta: string = "twitter:image";
  public ngNavigatorShareService: NgNavigatorShareService;
  constructor(
    public configService: ConfigService,
    private transferHttp: TransferState,
    @Inject(PLATFORM_ID) platformId, private injector: Injector, public db: AngularFirestore, private title: Title, private meta: Meta, public router: Router, ngNavigatorShareService: NgNavigatorShareService, private domSanitizer: DomSanitizer, public common: CommonService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.ngNavigatorShareService = ngNavigatorShareService;
    if (this.isBrowser) {
      this.id = this.configService.getWebsiteId()
      this.data = this.configService.getWebsiteData()
      this.domainName = this.configService.getDomain()
      this.customDomain = this.configService.getCustomDomain()
      if (this.id) {
        this.setData()
      }
    } else {
      console.log("Server ")
      this.setDomain()
    }

  }

  setAll() {
    if (this.customDomain) {
      console.log("inside")
      this.setDataForCustomDomain()
    }
    else {
      this.setDataForDomain()
    }
  }

  setDomain() {
    if (!this.isBrowser) {
      let host
      if (this.injector.get('header')['req']['headers']['x-forwarded-host']) {
        host = this.injector.get('header')['req']['headers']['x-forwarded-host']
      } else {
        host = this.injector.get('header')['req']['headers']['host']
      }
      let ssrRequestHost = host
      if (environment.hostdomain.indexOf(ssrRequestHost) != -1) {
        // console.log("domain name", this.injector.get('header')['req']['url'].split("/")[1])
        this.domainName = this.injector.get('header')['req']['url'].split("/")[1]
      }
      else {
        this.customDomain = host
        console.log(this.customDomain)
      }
      this.setAll()
    }
    else {
      if (environment.hostdomain.indexOf(window.location.hostname) != -1) {

      }
      else {
        this.customDomain = window.location.hostname
        // console.log(this.customDomain)
        this.setAll()
      }
    }
  }



  setDataForDomain() {
    console.log("custom>")
    this.db.collection("users", ref => ref.where("domainName", "==", this.domainName)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((userdata: any) => {
      if (userdata.length == 0) {
        this.router.navigateByUrl("/validity-expired")
        return
      }
      if (userdata) {
        if (userdata[0].active) {
          this.data = userdata[0]
          this.data.mainMenu = this.data.mainMenu.sort((a, b) => a.sort - b.sort);

          this.id = this.data.id
          if (!this.data.metaTags) {
            this.data.metaTags = {
              title: "",
              description: "",
              imageUrl: "", // ye error q aari ahi ye function bana rakhe hai fir bhi aari hai
              authorName: "",
              keyWords: ""
            }
          }
          const key = makeStateKey<any>('websiteData');
          this.transferHttp.set(key,this.data)
          this.shareLink = encodeURIComponent("*" + this.data.metaTags.title + "* \n" + this.data.metaTags.description + "\n" + environment.domain + this.data.domainName)
          this.setMetaTags()
          // console.log("meta tags set")
          if (this.isBrowser && this.data.theme != 6) { // remove all if conditions teko mza ata hai kya if condition lagane me hahaha
            this.setGallery()
            this.setProducts()
            this.setServices()
            this.setCategories()
            this.setKeypoints()
            this.setVideos()
            this.setTestimonials()
            this.setCarousel() // theme 6 ke home page pe har section pe ngif="collection && collection.length>0" ye daal de ok
          }
        }
      }
    })
  }


  setDataForCustomDomain() {
    console.log(":custom Domain")
    this.db.collection("users", ref => ref.where("customDomains", "array-contains", this.customDomain)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((userdata: any) => {
      if (userdata.length == 0) {
        this.router.navigateByUrl("/validity-expired")
        return
      }
     
      if (userdata) {
        if (userdata[0].active) {
          this.data = userdata[0]
          this.data.mainMenu = this.data.mainMenu.sort((a, b) => a.sort - b.sort);
          //console.log(this.data.mainMenu.sort((a, b) => a.sort - b.sort))
          this.id = this.data.id
          let url = "https://" + this.customDomain
          console.log(userdata[0].id)
          const key = makeStateKey<any>('websiteData');
          this.transferHttp.set(key,this.data)
          this.shareLink = encodeURIComponent("*" + this.data.metaTags.title + "* \n" + this.data.metaTags.description + "\n" + url)
          this.setMetaTags()
          if (this.isBrowser && this.data.theme != 6) {
            if (!this.data.gallery) {  // total 3 functions hai getdata getdatafordomaijn and getdate for custom domain ok
              this.setGallery()
            }
            if (!this.data.products) {
              this.setProducts()
            }
            if (!this.data.services) {
              this.setServices()
            }
            if (!this.data.categories) {
              this.setCategories()
            }
            this.setKeypoints()
            this.setVideos()
            this.setTestimonials()
            this.setCarousel()
          }
        }
      }
    })
  }





  setData() {
    console.log(this.data)
    if (this.data) {
      if (this.data.active) {

        //console.log(this.data.mainMenu.sort((a, b) => a.sort - b.sort))
        this.id = this.data.id
        if (!this.data.metaTags) {
          this.data.metaTags = {
            title: "",
            description: "",
            imageUrl: "",
            authorName: "",
            keyWords: ""
          }
        }
        const key = makeStateKey<any>('websiteData');
        this.transferHttp.set(key,this.data)
        this.shareLink = encodeURIComponent("*" + this.data.metaTags.title + "* \n" + this.data.metaTags.description + "\n" + environment.domain + this.data.domainName)
        this.setMetaTags()
        if (this.isBrowser && this.data.theme != 6) {
          this.data.mainMenu = this.data.mainMenu.sort((a, b) => a.sort - b.sort);
          this.setGallery()
          this.setProducts()
          this.setServices()
          this.setCategories()
          this.setKeypoints()
          this.setVideos()
          this.setTestimonials()
          this.setCarousel()
        }
      }
    }
  }

  setGallery() {
    this.db.collection("users").doc(this.id).collection("gallery", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(gallery => {
      // console.log("gallery",gallery)
      this.data.gallery = gallery
    })
  }


  setProducts() {
    this.db.collection("users").doc(this.id).collection("products", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(products => {
      //console.log("products", products)
      this.data.products = products
    })
  }



  setServices() {
    this.db.collection("users").doc(this.id).collection("services", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(services => {
      this.data.services = services
    })
  }

  getDataByCollection(collection) {
    if(collection == 'gallery' || collection == 'videos') {
      return this.db.collection("users").doc(this.id).collection(collection, ref => ref.orderBy("sort", "asc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    else
    {
      return this.db.collection("users").doc(this.id).collection(collection, ref => ref.orderBy("priority", "asc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
  }

  setKeypoints() {
    this.db.collection("users").doc(this.id).collection("keypoints", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(keypoints => {
      this.keypoints = keypoints
    })
  }


  setCarousel() {
    this.db.collection("users").doc(this.id).collection("carousel", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(carousel => {
      this.carousel = carousel
    })
  }

  setVideos() {
    this.db.collection("users").doc(this.id).collection("videos", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(async videos => {
      //console.log("videos", videos)
      this.videos = []
      this.videosAllId = []
      this.embedUrl = []
      this.secureVideoLinks = []
      this.videos = videos
      await this.seperateVideosId()
      await this.getEmbedUrl()
      await this.byPassTheUrl()
    })
  }

  seperateVideosId() {
    this.videos.forEach(element => {
      //console.log(element.youTubeLink)
      // console.log(element.youTubeLink.length)
      // let n = element.youTubeLink.length
      // console.log(element.youTubeLink.split(17,n-1))
      let url = element.youTubeLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      let id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
      //console.log("Youtube id", id)
      this.videosAllId.push(id)
      //console.log(this.videosAllId)
    })
  }

  getEmbedUrl() {
    this.videosAllId.forEach(element => {
      let url = "https://www.youtube.com/embed/" + element
      this.embedUrl.push(url)
    })
    //console.log("embedUrl", this.embedUrl)
  }

  byPassTheUrl() {
    this.embedUrl.forEach(element => {
      this.secureVideoLinks.push(this.domSanitizer.bypassSecurityTrustResourceUrl(element))
    })
    //console.log("secureVideoLinks", this.secureVideoLinks)
  }

  public setMetaTags(): void {
    //console.log(this.data)
    console.log("meta")
    var imageUrl = this.data.metaTags.imageUrl;
    var tags = [
      new MetaTag(this.urlMeta, this.getWindowLocation(), true),
      new MetaTag(this.titleMeta, this.data.metaTags.title, true),
      new MetaTag(this.descriptionMeta, this.data.metaTags.description, true),
      new MetaTag("description", this.data.metaTags.description, true),
      new MetaTag("title", this.data.metaTags.title, true),
      new MetaTag(this.imageMeta, imageUrl, true),
      new MetaTag(this.secureImageMeta, imageUrl, true),
      new MetaTag(this.twitterTitleMeta, this.data.metaTags.title, false),
      new MetaTag(this.twitterImageMeta, imageUrl, false)
    ];
    this.title.setTitle(this.data.metaTags.title);
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      const tag = siteTag.isFacebook ? this.meta.getTag(`property='${siteTag.name}'`) : this.meta.getTag(`name='${siteTag.name}'`);
      if (siteTag.isFacebook) {
        this.meta.updateTag({ property: siteTag.name, content: siteTag.value });
      } else {
        this.meta.updateTag({ name: siteTag.name, content: siteTag.value });
      }
    });
  }

  makeEnquiry(name: string, contact: string, message: string, email: string) {
    let timestamp = firebase.firestore.Timestamp.now()
    if (!email) {
      email = ""
    }
    return this.db.collection("users").doc(this.data.id).collection("enquiry").add({ name, contact, message, timestamp, email })
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  share(file?) {

    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
    if (file) {

      this.ngNavigatorShareService.share({
        title: this.data.metaTags.title + "\n",
        text: decodeURIComponent(this.shareLink),
        //url: this.customDomain?this.customDomain:(environment.domain+this.data.domainName),
        //files:[file]
      }).then((response) => {

      })
        .catch((error) => {
        });
    } else {

      this.ngNavigatorShareService.share({
        title: this.data.metaTags.title,
        text: decodeURIComponent(this.shareLink),
        //url: this.customDomain?this.customDomain:(environment.domain+this.data.domainName),
      }).then((response) => {

      })
        .catch((error) => {

        });
    }
  }

  setTestimonials() {
    this.db.collection("users").doc(this.id).collection("testimonials", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(testimonials => {

      this.data.testimonials = testimonials
    })
  }

  getServiceDetails(slug) {
    return this.db.collection("users").doc(this.id).collection("services", ref => ref.where("slug", "==", slug)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getMyOrders(status) {
    if (status != 'all') {
      return this.db.collection("users").doc(this.id).collection("orders", ref => ref.where("customerId", "==", this.getCustomerData().mobileNumber).where('status', "==", status).orderBy("timestamp", "desc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }
    else {
      return this.db.collection("users").doc(this.id).collection("orders", ref => ref.where("customerId", "==", this.getCustomerData().mobileNumber).orderBy("timestamp", "desc")).get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }

  }

  getSingleOrder(id) {
    return this.db.collection("users").doc(this.id).collection("orders", ref => ref.where("customerId", "==", this.getCustomerData().mobileNumber)).doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  getSingleCustomPage(slug) {
    return this.db.collection("users").doc(this.id).collection("pages",ref=>ref.where("slug","==",slug)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    );
  }

  setCategories() {
    return this.db.collection("users").doc(this.id).collection("categories", ref => ref.where("status", "==", true).orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(res => {
      this.allCategories = res
    })
  }

  getSubCategories(slug) {
    return this.db.collection("users").doc(this.id).collection("subcategories", ref => ref.where("categoryId", "==", slug).orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    );
  }

  getAllCoupon() {
    return this.db.collection("users").doc(this.id).collection("coupon", ref => ref.orderBy("timestamp", "desc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    );
  }

  navigateTo(page: any, queryParams: any = {}) {
    let path = this.customDomain ? page : '/' + this.domainName + page
    return this.router.navigate([path], { queryParams: queryParams });
  }

  getWindowLocation() {
    return window.location.href
  }

  getInnerWidth() {
    return window.innerWidth
  }

  openOutsideUrl(url) {
    window.open(url, "_blank")
  }

  getCustomerData() {
    return JSON.parse(localStorage.getItem(this.id + "_customer"))
  }

}
