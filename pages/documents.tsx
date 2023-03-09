import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IDocument } from "../types/Document.d";
import CreateDocument from "../components/documents/CreateDocument";
import SubHeader from "../components/layout/SubHeader";
import Modal from "../components/misc/Modal";
import Document from "../components/documents/Document";
import DocumentsFilter from "../components/documents/DocumentsFilter";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LoadingPage from "../components/misc/LoadingPage";
import { useDocuments } from "hooks/useDocuments";

function searchAndSortDocuments(
  documents: IDocument[],
  query: string
): IDocument[] {
  //if search query is empty then return all
  if (!query || query === "") return documents;

  // Split the search query into individual words and lowercase them
  const queryWords = query.split(" ").map((word) => word.toLowerCase());

  // Create an empty list of search results
  const searchResults: Array<{ document: IDocument; relevance: number }> = [];

  // Loop through each document in the list
  for (const document of documents) {
    // Split the document's title, topic, and html into individual words and lowercase them
    const docWords = [
      ...(document.title ? document.title.split(" ") : []),
      ...(document.topic ? document.topic.split(" ") : []),
      ...(document.html ? document.html.split(" ") : []),
    ]
      .filter(Boolean)
      .map((word) => word.toLowerCase());

    // Calculate the relevance of the document to the search query by counting the number of times
    // the words in the search query appear in the document's title, topic, and html
    let relevance = 0;
    if (queryWords && queryWords.length > 0) {
      for (const queryWord of queryWords) {
        relevance += docWords.filter((word) => word === queryWord).length;
      }
    }

    // Add the document and its calculated relevance to the list of search results if the relevance is greater than 0
    if (relevance > 0) {
      searchResults.push({ document, relevance });
    }
  }

  // Sort the list of search results by relevance in descending order
  searchResults.sort((a, b) => b.relevance - a.relevance);

  // Return the sorted list of search results
  return searchResults.map((result) => result.document);
}

export default function Documents() {
  const { loading, documents } = useDocuments();

  const [filter, setFilter] = useState({
    topic: null,
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [filteredDocuments, setFilteredDocuments] = useState<
    null | IDocument[]
  >(null);

  useEffect(() => {
    if (documents) {
      let newDocuments: IDocument[] = documents;
      if (filter.topic) {
        newDocuments = newDocuments.filter((doc) => doc.topic === filter.topic);
      }
      if (filter.category !== "all") {
        newDocuments = newDocuments.filter(
          (doc) => doc.category === filter.category
        );
      }
      newDocuments = searchAndSortDocuments(newDocuments, searchQuery);
      setFilteredDocuments(newDocuments);
    }
  }, [documents, filter, searchQuery]);

  return (
    <>
      <Head>
        <title>Make-it-All | Dashboard</title>
      </Head>
      <SubHeader>
        <div className="flex justify-between w-full h-full items-center gap-2 ">
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (documents) {
                setFilteredDocuments(
                  searchAndSortDocuments(documents, searchQuery)
                );
              }
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              value={searchQuery}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => {
                        if (documents) {
                          setFilteredDocuments(
                            searchAndSortDocuments(documents, searchQuery)
                          );
                        }
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setSearchQuery("");
                        if (documents) {
                          setFilteredDocuments(
                            searchAndSortDocuments(documents, "")
                          );
                        }
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              size="small"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ToggleButton
            sx={{ display: "flex", gap: 1 }}
            size="small"
            value="check"
            selected={filterOpen}
            onChange={() => {
              setFilterOpen(!filterOpen);
              setFilter({ topic: null, category: "all" });
            }}
          >
            <FilterListIcon />
            Filter
          </ToggleButton>
          <Modal
            title="New Document"
            button={
              <div className="z-[100] fixed bottom-4 mobile-only:bottom-20 right-8">
                <Fab color="primary" aria-label="add">
                  <PostAddIcon />
                </Fab>
              </div>
            }
          >
            <CreateDocument />
          </Modal>
        </div>
      </SubHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-col">
          {filteredDocuments && documents ? (
            <>
              {filterOpen && (
                <DocumentsFilter documents={documents} setFilter={setFilter} />
              )}
              <div>
                {filteredDocuments.map((document, i) => {
                  return <Document key={i} doc={document} />;
                })}
              </div>
            </>
          ) : (
            <LoadingPage />
          )}
        </div>
      </Box>
    </>
  );
}
