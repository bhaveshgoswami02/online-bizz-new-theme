import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThemesManagerService } from './themes-manager.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  collection = "videos"
  videos = []
  videosAllId = []
  embedUrl = []
  secureVideoLinks = []
  constructor(public db: AngularFirestore, public _themeService: ThemesManagerService, private domSanitizer: DomSanitizer) { }

  setVideos() {
    this.db.collection("users").doc(this._themeService.id).collection(this.collection, ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(async videos => {
      // console.log("videos", videos)
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
      // console.log(element.youTubeLink)
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
    // console.log("embedUrl", this.embedUrl)
  }

  byPassTheUrl() {
    this.embedUrl.forEach(element => {
      this.secureVideoLinks.push(this.domSanitizer.bypassSecurityTrustResourceUrl(element))
    })
    // console.log("secureVideoLinks", this.secureVideoLinks)
  }
}
