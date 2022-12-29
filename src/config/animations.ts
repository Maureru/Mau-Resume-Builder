const easing = [0.17, 0.67, 0.83, 0.67]

export const templateModal: {
    hide: {
        opacity: number,
        y: number,
        transition: {
            ease: number[],
            duration: number
        }
    }
    show: {
        opacity: number,
        y: number,
        transition: {
            ease: number[],
            duration: number
        }
    }
} = {
    hide: {
        opacity: 0,
        y: 10,
        transition: {
            ease: easing,
            duration: 0.1
        }
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: easing,
            duration: 0.2
        }
    },
}

export const staggerTemplateCard: {
    hide: {
        opacity: number
    },
    show: {
        opacity: number,
        transition: {
            staggerChildren: number
        }
    }
} = {
    hide: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
}

export const staggeredItemCard = {
    hide: {opacity: 0},
    show: {opacity: 1}
}

export const transition = {
    initial: {
        opacity: 0,
    },
    transition: {
        opacity: 1,
        transition: {
            ease: 'linear',
            duration: 1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'linear',
            duration: 1
        }
    },
}