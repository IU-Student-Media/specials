var config = {
    style: 'mapbox://styles/vivrao/ckncf91bz29zv17pl3lmf0h7k',
    accessToken: 'pk.eyJ1Ijoidml2cmFvIiwiYSI6ImNqczUxNWF5ZDBhdnE0OXRmb2QwbnEyamYifQ.tIV7H8FUvlke_utWqMeQmg',
    showMarkers: false,
    theme: 'light',
    title: '',
    subtitle: '',
    byline: '',
    footer: '',
    chapters: [
        {
            id: 'slide-one',
            alignment: 'right',
            title: 'What is a UDO?',
            image: '',
            description: 'The Unified Development Ordinance determines Bloomington’s land use and development. A number of zoning districts exist that designate the type of development allowed in those areas. Skip to the story <a class="story-link" href="#hedd">here</a> or continue scrolling.',
            location: {
                center: [-86.5311, 39.1706],
                zoom: 10.83,
                pitch: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'new-proposed-changes',
                    opacity: 0.75
                },
                {
                    layer: 'new_mixed-use',
                    opacity: 0
                },
                {
                    layer: 'new_residential-urban',
                    opacity: 0
                },
                {
                    layer: 'new_parks-open-spaces',
                    opacity: 0
                }
            ],
            onChapterExit:  [
                {
                  layer: 'new-proposed-changes',
                  opacity: 0.0
                }
            ]
        },
        {
            id: 'slide-two',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'The proposed changes include adding three new zoning districts: <span class="mixed-use">Mixed-Use Student Housing</span>, <span class="parks-open-spaces">Parks and Open Spaces</span>, and <span class="residential-urban">Residential Urban</span>.',
            location: {
                center: [-86.5311, 39.1685],
                zoom: 11.66,
                pitch: 0.0,
                bearing: 0.0
            },
            onChapterEnter: [
                {
                    layer: 'new_mixed-use',
                    opacity: 0.8
                },
                {
                    layer: 'new_parks-open-spaces',
                    opacity: 0.8
                },
                {
                    layer: 'new_residential-urban',
                    opacity: 0.8
                }
            ],
            onChapterExit: [
              {
                  layer: 'new_mixed-use',
                  opacity: 0.8
              },
              {
                  layer: 'new_parks-open-spaces',
                  opacity: 0.1
              },
              {
                  layer: 'new_residential-urban',
                  opacity: 0.1
              }
            ]
        },
        {
            id: 'slide-three',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'The <span class="mixed-use">Mixed-Use Student Housing district</span> would have campus-accessible housing with commercial corridors, which are streets and roadways surrounded by businesses and commercial buildings. The area would have options from single-family homes to duplexes and triplexes to residence halls and greek houses.',
            location: {
                center: [-86.50728, 39.17862],
                zoom: 11.15,
                pitch: 0.0,
                bearing: 0.0
            },
            onChapterEnter: [
                {
                    layer: 'new_mixed-use',
                    opacity: 0.8
                },
                {
                    layer: 'new_parks-open-spaces',
                    opacity: 0.1
                },
                {
                    layer: 'new_residential-urban',
                    opacity: 0.1
                }
            ],
            onChapterExit: [
              {
                  layer: 'new_mixed-use',
                  opacity: 0.1
              },
              {
                  layer: 'new_parks-open-spaces',
                  opacity: 0.8
              },
              {
                  layer: 'new_residential-urban',
                  opacity: 0.1
              }
            ]
        },
        {
            id: 'slide-four',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'The <span class="parks-open-spaces">Parks and Open Space district</span> would provide protections for city parks and limit building other structures on the land. It would include larger plots, such as the Griffy Lake Nature Preserve, as well as neighborhood parks, like Crestmont Park and Bryan Park.',
            location: {
                center: [-86.5311, 39.1664],
                zoom: 11.79,
                pitch: 0.0,
                bearing: 0.0
            },
            onChapterEnter: [
                {
                    layer: 'new_mixed-use',
                    opacity: 0.1
                },
                {
                    layer: 'new_parks-open-spaces',
                    opacity: 0.8
                },
                {
                    layer: 'new_residential-urban',
                    opacity: 0.1
                }
            ],
            onChapterExit: [
              {
                  layer: 'new_mixed-use',
                  opacity: 0.1
              },
              {
                  layer: 'new_parks-open-spaces',
                  opacity: 0.1
              },
              {
                  layer: 'new_residential-urban',
                  opacity: 0.8
              }
            ]
        },
        {
            id: 'slide-five',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'If passed, the <span class="residential-urban">Residential Urban</span>, or R4, zoning district would offer more permitted housing forms beyond just single-family homes, including duplexes and triplexes.',
            location: {
                center: [-86.49754, 39.15418],
                zoom: 12.72,
                pitch: 0.0,
                bearing: 0.0
            },
            onChapterEnter: [
                {
                    layer: 'new_mixed-use',
                    opacity: 0.1
                },
                {
                    layer: 'new_parks-open-spaces',
                    opacity: 0.1
                },
                {
                    layer: 'new_residential-urban',
                    opacity: 0.8
                }
            ],
            onChapterExit: [
              {
                  layer: 'new_mixed-use',
                  opacity: 0
              },
              {
                  layer: 'new_parks-open-spaces',
                  opacity: 0
              },
              {
                  layer: 'new_residential-urban',
                  opacity: 0
              }
            ]
        },
        {
            id: 'slide-six',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'Residents have raised concerns over the inclusion of R4 zoning in <span class="core-neighborhood">core neighborhoods</span> if the UDO ordinances are passed.',
            location: {
                center: [-86.5211, 39.1696],
                zoom: 11.66,
                pitch: 0.0,
                bearing: 0.0
            },
            onChapterEnter: [
                {
                    layer: 'city-neighborhoods',
                    opacity: 0.8
                }
            ],
            onChapterExit: [
              {
                  layer: 'city-neighborhoods',
                  opacity: 0.0
              }
            ]
        },
        {
            id: 'slide-seven',
            alignment: 'right',
            // title: 'City Neighborhoods',
            image: '',
            description: 'The Bloomington City Council will debate two major zoning ordinances Wednesday. The public will have time to weigh in. The first day the council can vote on whether to pass these ordinances is May 5.',
            location: {
                center: [-86.5230999037778, 39.169004593188525],
                zoom: 10.83,
                pitch: 0.0,
                bearing: 0.0
            }
            // onChapterEnter: [
            //     {
            //         layer: 'city-neighborhoods',
            //         opacity: 0.8
            //     }
            // ],
            // onChapterExit: [
            //   {
            //       layer: 'city-neighborhoods',
            //       opacity: 0.0
            //   }
            // ]
        }
    ]
};
