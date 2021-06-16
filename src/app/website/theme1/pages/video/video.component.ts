import { Component, OnInit } from '@angular/core';
import { ThemesManagerService } from '../../../services/themes-manager.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videos = []
  videosAllId = []
  embedUrl = []
  secureVideoLinks = []

  constructor(
    public _themeService: ThemesManagerService
  ) { }

  videoPlayerwidthSize = 0;
  videoPlayerheightSize = 0;

  ngOnInit(): void {
    if (this._themeService.getInnerWidth() > 1020) {
      this.videoPlayerwidthSize = 350;
      this.videoPlayerheightSize = 200;
    } else if (this._themeService.getInnerWidth() > 320) {
      this.videoPlayerwidthSize = this._themeService.getInnerWidth() - 30;
      this.videoPlayerheightSize = 200;
    } else {
      this.videoPlayerwidthSize = 310;
      this.videoPlayerheightSize = 200;
    }
    // this._themeService.getVideos().subscribe(async videos => {
    //   console.log("videos", videos)
    //   this.videos = []
    //   this.videosAllId = []
    //   this.embedUrl = []
    //   this.secureVideoLinks = []

    //   this.videos = videos
    //   await this.seperateVideosId()
    //   await this.getEmbedUrl()
    //   await this.byPassTheUrl()
    // })
  }

  getCover() {
    if (this._themeService?.data?.themeCover) {
      return "url('" + this._themeService?.data?.themeCover + "')"
    }
    else {
      return "url('../../../../../assets/Images/default_product_cover_background.jpg')";
    }
  }

  // seperateVideosId() {
  //   this.videos.forEach(element => {
  //     console.log(element.youTubeLink)
  //     // let n = element.youTubeLink.length
  //     let url = element.youTubeLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  //     let id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
  //     this.videosAllId.push(id)
  //   })
  // }

  // getEmbedUrl() {
  //   this.videosAllId.forEach(element => {
  //     let url = "https://www.youtube.com/embed/" + element
  //     this.embedUrl.push(url)
  //   })
  // }

  // byPassTheUrl() {
  //   this.embedUrl.forEach(element => {
  //     this.secureVideoLinks.push(this.domSanitizer.bypassSecurityTrustResourceUrl(element))
  //   })
  // }

}
