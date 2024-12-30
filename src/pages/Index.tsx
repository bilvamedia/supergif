import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategorySelector } from "@/components/CategorySelector";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import CharacterSelector from "@/components/CharacterSelector"; 
import { TransportSelector } from "@/components/TransportSelector"; 
import { Sparkles, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateGif } from "@/utils/gifGenerator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter, faLinkedin, faReddit, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEnvelope, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { containsBannedWords } from '@/utils/phoneticFilter'; 
import Snackbar from '@/components/Snackbar'; 
import { BACKGROUND_STYLES } from '../utils/backgroundstyles';
import DEFAULT_SUGGESTIONS from "@/utils/defaultSuggestions";
import BANNED_WORDS from "@/utils/bannedWords";
import { SuperGifLogo } from "@/components/SuperGifLogo";
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import FeedbackDialog from '@/components/FeedbackDialog';

const suggestions = DEFAULT_SUGGESTIONS;
const CATEGORIES = {
  party: "Party & Celebration",
  food: "Food & Drinks",
  animals: "Cute Animals",
  nature: "Nature & Magic",
  love: "Love & Hearts",
  fun: "Fun & Games",
  music: "Music & Dance",
  sports: "Sports & Games"
};

interface Props {
  categories: string[];
  backgrounds: string[];
  characters: string[];
}

function Index({ categories = [], backgrounds = [], characters = [] }: Props) {
  const [message, setMessage] = useState('Welcome to Super GIF');
  const [category, setCategory] = useState(Object.keys(CATEGORIES)[0]);
  const [background, setBackground] = useState(Object.keys(BACKGROUND_STYLES)[1]);
  const [selectedCharacter, setSelectedCharacter] = useState('sparkle-star');
  const [selectedTransport, setSelectedTransport] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [regenerateKey, setRegenerateKey] = useState(0);
  const [faceImage, setFaceImage] = useState<HTMLImageElement | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [defaultTemplates, setDefaultTemplates] = useState([]);
  const [defaultGifs, setDefaultGifs] = useState([]);
  const defaultCharacters = characters;
  const defaultBackgrounds = Object.keys(BACKGROUND_STYLES);

  const [selectedSmileys, setSelectedSmileys] = useState([]);

  // Add useEffect to automatically regenerate GIF when selections change
  useEffect(() => {
    if (message && selectedCharacter && background && category) {
      handleGenerateGif();
    }
  }, [message, selectedCharacter, background, category, selectedTransport]);

  useEffect(() => {
    const container = document.getElementById('suggestion-container');
    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (container) {
        scrollAmount += 1; 
        container.scrollLeft = scrollAmount;
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
    }, 30); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    console.log('Generating default welcome GIF');
    generateWelcomeGif();
  }, []);

  useEffect(() => {
    const styles = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-gradient {
        background-size: 200% 200%;
        animation: gradientShift 3s ease infinite;
      }
    `;

    if (typeof document !== 'undefined') {
      const styleSheet = document.createElement("style");
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarVisible(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character);
  };

  const handleBackgroundSelect = (bg: string) => {
    setBackground(bg);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
  };

  const handleTransportSelect = (transport: string) => {
    setSelectedTransport(prev => [...prev, transport]);
  };

  const handleGenerateGif = async () => {
    if (!suggestions.includes(message) && containsBannedWords(message, BANNED_WORDS)) {
      console.log('message:', message);
      setSnackbarMessage('Your message contains inappropriate language. Please revise your input.');
      setSnackbarVisible(true);
      return;
    }

    console.log('Starting GIF generation with:', {
      message,
      background,
      character: selectedCharacter,
      category,
      transportCount: selectedTransport.length
    });

    setLoading(true);
    setError(null);
    try {
      const url = await generateGif({
        message,
        background: background,
        character: selectedCharacter,
        category,
        faceImage,
        selectedTransport
      });
      console.log('GIF generated successfully');
      setGifUrl(url);
    } catch (err) {
      console.error('Failed to generate GIF:', err);
      setError(err.message);
      toast.error('Failed to generate GIF');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    handleGenerateGif(); 
  };

  const handleBackgroundChange = (newBackground: string) => {
    console.log('Background changed to:', newBackground); 
    console.log('Previous background:', background); 
    setBackground(newBackground);
    console.log('Regenerating GIF with new background...'); 
    console.log('New background:', newBackground); 
    handleGenerateGif(); 
  };

  const generateWelcomeGif = async () => {
    console.log('Setting up welcome GIF configuration');
    setMessage('Welcome to Super GIF');
    setCategory('party');
    setBackground('sparkle');
    setSelectedCharacter('sparkle-star');
    setSelectedTransport([]); 

    setTimeout(() => {
      console.log('Generating welcome GIF with configured settings');
      handleGenerateGif();
    }, 0);
  };

  const toggleSmileySelection = (smiley) => {
    setSelectedSmileys((prev) => {
      if (prev.includes(smiley)) {
        return prev.filter(s => s !== smiley);
      } else {
        return [...prev, smiley];
      }
    });
  };

  return (
    <Layout showBackButton={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          <SuperGifLogo />
        </div>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">Create magical celebration GIFs with just a few clicks!</p>
        </div>
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 space-y-6 relative text-card-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 max-w-md">
                <div>
                  <Label>Message</Label>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Type your message here..."
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {message.length}/50 characters
                  </div>
                  <div className="suggestion-slider">
                    <div className="suggestion-track">
                      {[...suggestions, ...suggestions].map((suggestion, index) => (
                        <div 
                          key={`${suggestion}-${index}`} 
                          className="suggestion-item cursor-pointer bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-sm shadow-sm hover:bg-blue-300 inline-block mx-1"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                  <style jsx>{`
                    .suggestion-slider {
                      position: relative;
                      width: 100%;
                      height: 40px;
                      display: flex;
                      align-items: center;
                      overflow: hidden;
                      background: transparent;
                      margin-top: 8px;
                    }
                    
                    .suggestion-track {
                      display: flex;
                      gap: 0.75rem;
                      animation: scrollSuggestions 45s linear infinite;
                      white-space: nowrap;
                      will-change: transform;
                      padding: 4px 0;
                    }
                    
                    .suggestion-track:hover {
                      animation-play-state: paused;
                    }
                    
                    @keyframes scrollSuggestions {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-50%);
                      }
                    }
                    
                    .suggestion-item {
                      transition: transform 0.2s ease-out;
                      padding: 6px 12px;
                    }
                    
                    .suggestion-item:hover {
                      transform: scale(1.1);
                      background-color: #e3effd;
                    }
                  `}</style>
                </div>
                <CharacterSelector
                  selectedCharacter={selectedCharacter}
                  onSelect={handleCharacterSelect}
                  selectedSmileys={selectedSmileys}
                  toggleSmileySelection={toggleSmileySelection}
                />
                <TransportSelector 
                  selected={selectedTransport}
                  onSelect={handleTransportSelect}
                />
                <BackgroundSelector 
                  onSelect={handleBackgroundSelect} 
                  selected={background} 
                />
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={handleCategorySelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(CATEGORIES).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CATEGORIES[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {gifUrl ? (
                    <div className="relative inline-block w-full">
                      <img
                        src={gifUrl}
                        alt="Generated GIF"
                        className="mx-auto"
                        key={gifUrl} 
                      />
                      <a 
                        href={gifUrl} 
                        download="super-gif.gif"
                        className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-blue-500/95 hover:bg-blue-600/95 rounded-full shadow-md transition-colors"
                        title="Download GIF"
                      >
                        <svg 
                          className="w-4 h-4 text-white" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M12 7v8m-4-4l4 4l4-4"></path>
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground">GIF preview will appear here</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleGenerateGif}
                    disabled={loading || !message}
                    className="px-6"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate GIF
                      </>
                    )}
                  </Button>
                  {gifUrl && (
                    <>
                      <div className="h-px bg-gray-200" />
                      <div className="flex flex-wrap justify-center items-center gap-4">
                        <span className="text-sm text-gray-500">Share:</span>
                        <div className="flex items-center justify-center gap-3">
                          <a href={`https://wa.me/?text=Check%20out%20this%20GIF!%20${gifUrl}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 text-green-500 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${gifUrl}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 text-blue-600 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20GIF!%20${gifUrl}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faTwitter} className="w-5 h-5 text-blue-400 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${gifUrl}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-blue-700 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://www.reddit.com/submit?url=${gifUrl}&title=Check%20out%20this%20GIF!`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faReddit} className="w-5 h-5 text-orange-600 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://pinterest.com/pin/create/button/?url=${gifUrl}&media=${gifUrl}&description=Check%20out%20this%20GIF!`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faPinterest} className="w-5 h-5 text-red-600 hover:scale-110 transition-transform" />
                          </a>
                          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20out%20this%20GIF!&body=Check%20out%20this%20GIF!%20${gifUrl}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-red-500 hover:scale-110 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-6 pb-4">
          <FeedbackDialog />
          <p className="text-sm text-gray-400">
            Made with ❤️ in India, Hyderabad by Yogesh Kulkarni
          </p>
        </div>
        <Snackbar message={snackbarMessage} duration={3000} action={{ label: 'Undo', onClick: () => setSnackbarVisible(false) }} />
      </div>
    </Layout>
  );
};

export default Index;