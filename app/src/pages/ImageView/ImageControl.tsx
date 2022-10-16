class ImageControl {
    static zoomLevel = 100
    static zoomLimitMin = 10
    static zoomLimitMax = 1000
    static zoomDefault = 1
    static zoomRatio = 1

    static classNameOverWidth = 'over-width'
    static classNameOverHeight = 'over-height'

    static onWheel = (ev: WheelEvent) => {
        ev.preventDefault()

        if (ev.deltaY < 0) {
            this.zoomIn()
        } else {
            this.zoomOut()
        }
    }

    static zoomIn = () => {
        this.zoomLevel += Math.round(this.zoomDefault * this.zoomRatio)
        if (this.zoomLimitMax < this.zoomLevel) { this.zoomLevel = this.zoomLimitMax }
        this.changeZoom(this.zoomLevel)
    }

    static zoomOut = () => {
        this.zoomLevel -= Math.round(this.zoomDefault * this.zoomRatio)
        if (this.zoomLevel < this.zoomLimitMin) { this.zoomLevel = this.zoomLimitMin}
        this.changeZoom(this.zoomLevel)
    }

    static changeZoom = (level: number) => {
        const fifure = document.querySelector<HTMLElement>('figure')
        if (!fifure) { return }

        const main_image = document.querySelector<HTMLImageElement>('img')
        if (!main_image) { return }

        main_image.style.height = level + 'vh'
        main_image.style.maxHeight = level + 'vh'
        main_image.style.maxWidth = level + 'vw'

        const body = document.querySelector<HTMLElement>('body')
        if (!body) { return }

        const max_width = body.clientWidth
        const max_height = body.clientHeight
        const width = main_image.width
        const height = main_image.height

        if (max_width < width) {
            if (!fifure.classList.contains(this.classNameOverWidth)) {
                fifure.classList.add(this.classNameOverWidth)
            }
        } else {
            if (fifure.classList.contains(this.classNameOverWidth)) {
                fifure.classList.remove(this.classNameOverWidth)
            }
        }

        if (max_height < height) {
            if (!fifure.classList.contains(this.classNameOverHeight)) {
                fifure.classList.add(this.classNameOverHeight)
            }
        } else {
            if (fifure.classList.contains(this.classNameOverHeight)) {
                fifure.classList.remove(this.classNameOverHeight)
            }
        }
    }

}

export default ImageControl
