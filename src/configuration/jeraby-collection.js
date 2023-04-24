// export interface CollectionWork {
//   id: string,
//   published: boolean
//   pageHeader: PageHeader,
//   title: string,
//   workState: 'sold'|'available',
//   workPriority: number,
//   presentationDescription: string,
//   presentationImages: {imgPath: string, imgAlt: string}[],
//   presentationType: 'oneLeft'|'oneRight'|'twoImages',
//   classNames: {
//     presentation: {
//       [key: string]: string
//     },
//   },
// }
// export interface Collection {
//   id: string,
//   pageHeader: PageHeader,
//   title: string,
//   description?: string,
//   collectionPriority: number,
//   published: boolean,
//   classNames: {
//     header: {
//       [key: string]: string
//     }
//   },
//   collectionWorks: CollectionWork[],
// }
const jeraby = {
    id: 'jeraby-collection',
    pageHeader: {
        title: 'jeraby.collection.title',
        bgImage: '/images/home-jerab.png',
        classNames: {
            'bg': ['bg-red-400'],
            'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
        }
    },
    title: 'jeraby.collection.title',
    description: 'jeraby.collection.description',
    collectionPriority: 1,
    published: true,
    classNames: {},
    collectionWorks: [
        {
            id: 'jeraby-1',
            published: false,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-1.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-1.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-1.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-1/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-1.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-1/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-1.presentationImages.2.imgAlt'
                    }],
                presentationType: 'twoImages',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-2',
            published: false,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-2.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-2.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-2.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-2/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-2.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-2/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-2.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneRight',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-3',
            published: false,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-3.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-3.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-3.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-3/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-3.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-3/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-3.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneLeft',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-4',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-4.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-4.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-4.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-4/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-4.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-4/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-4.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneRight',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    // 'title': 'text-jeraby',
                    // 'description': 'text-jeraby',
                    'cta': 'bg-[#DF442F]',
                },
            }
        },
        {
            id: 'jeraby-5',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-5.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-5.title',
            workState: 'sold',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-5.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-5/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-5.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-5/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-5.presentationImages.2.imgAlt'
                    }],
                presentationType: 'twoImages',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-6',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-6.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-6.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-6.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-6/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-6.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-6/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-6.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneLeft',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-7',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-7.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-7.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-7.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-7/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-7.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-7/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-7.presentationImages.2.imgAlt'
                    }],
                presentationType: 'twoImages',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-8',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-8.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-8.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-8.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-8/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-8.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-8/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-8.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneRight',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-9',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-9.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-9.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-9.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-9/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-9.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-9/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-9.presentationImages.2.imgAlt'
                    }],
                presentationType: 'twoImages',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-10',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-10.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-10.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-10.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-10/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-10.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-10/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-10.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneLeft',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-11',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-11.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-11.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-11.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-11/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-11.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-11/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-11.presentationImages.2.imgAlt'
                    }],
                presentationType: 'twoImages',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        },
        {
            id: 'jeraby-12',
            published: true,
            pageHeader: {
                title: 'jeraby.collection.works.jeraby-12.title',
                bgImage: '/images/home-jerab.png',
                classNames: {
                    'bg': ['bg-red-400'],
                    'title': ['mt-[15vh]', 'ml-[10%]', 'text-5xl', 'text-gray-800', 'font-bold'],
                }
            },
            title: 'jeraby.collection.works.jeraby-12.title',
            workState: 'available',
            presentation: {
                presentationDescription: 'jeraby.collection.works.jeraby-12.presentationDescription',
                presentationImages: [{
                        imgPath: '/images/collections/jeraby/jeraby-12/1.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-12.presentationImages.1.imgAlt',
                    }, {
                        imgPath: '/images/collections/jeraby/jeraby-12/2.jpg',
                        imgAlt: 'jeraby.collection.works.jeraby-12.presentationImages.2.imgAlt'
                    }],
                presentationType: 'oneRight',
                classNames: {
                    // 'main': 'bg-neutral-300/10',
                    'title': 'text-jeraby',
                    'description': 'text-jeraby',
                    'cta': 'text-jeraby',
                },
            }
        }
    ]
};
export default jeraby;
