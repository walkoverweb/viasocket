import { useState, useEffect } from 'react';

import axios from 'axios';

const fetchSearchResults = async (query) => {
    const url = `https://table-api.viasocket.com/appstore/elasticsearch/64f58cfe54919de3f250dc6d/tblwegm8v/search`;

    const data = {
        filter: {
            bool: {
                must: [
                    {
                        bool: {
                            should: [
                                {
                                    match: {
                                        key: {
                                            fuzziness: 2,
                                            query: query,
                                        },
                                    },
                                },
                                {
                                    match_phrase_prefix: {
                                        key: query,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        match: {
                            'row.status': 'published',
                        },
                    },
                    {
                        match: {
                            'row.audience': 'Public',
                        },
                    },
                ],
            },
        },
    };

    try {
        const response = await axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'auth-key': `${process.env.NEXT_PUBLIC_SEARCH_API_KEY}`,
            },
        });
        return response.data.data; // Update with actual response structure
    } catch (error) {
        console.log(error);
    } finally {
    }
};

export default fetchSearchResults;
