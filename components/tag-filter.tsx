'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, useDrawer } from '@/components/ui/drawer';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts?: Record<string, number>;
}

const DesktopTagFilter = ({
  tags,
  selectedTag,
  tagCounts,
  onTagClick
}: TagFilterProps & { onTagClick: (tag: string) => void }) => (
  <div className="hidden md:flex flex-wrap gap-2">
    {tags.map(tag => (
      <button
        key={tag}
        onClick={() => onTagClick(tag)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all ${
          selectedTag === tag
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-dashed'
        }`}
        style={
          selectedTag === tag
            ? { backgroundColor: 'var(--color-accent)', color: 'var(--color-primary-contrast)' }
            : undefined
        }
      >
        <span>{tag}</span>
        {tagCounts?.[tag] && (
          <span
            className={`text-xs font-semibold ${
              selectedTag === tag ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}
          >
            ({tagCounts[tag]})
          </span>
        )}
      </button>
    ))}
  </div>
);

const MobileTagFilterContent = ({
  tags,
  selectedTag,
  tagCounts,
  onTagClick
}: TagFilterProps & { onTagClick: (tag: string) => void }) => {
  const { setIsOpen } = useDrawer();

  const handleClick = (tag: string) => {
    onTagClick(tag);
    setIsOpen(false);
  };

  return (
    <>
      <DrawerHeader>
        <h3 className="font-semibold text-sm">Select Category</h3>
      </DrawerHeader>

      <DrawerBody>
        <div className="space-y-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => handleClick(tag)}
              className="w-full flex items-center justify-between font-medium cursor-pointer text-sm transition-colors"
            >
              <span
                className={`w-full flex items-center justify-between font-medium cursor-pointer text-sm transition-colors ${
                  selectedTag === tag ? 'underline underline-offset-4 text-primary' : 'text-muted-foreground'
                }`}
              >
                {tag}
              </span>
              {tagCounts?.[tag] && (
                <span className="shrink-0 ml-2 border border-border rounded-md h-6 min-w-6 flex items-center justify-center">
                  {tagCounts[tag]}
                </span>
              )}
            </button>
          ))}
        </div>
      </DrawerBody>
    </>
  );
};

const MobileTagFilter = (props: TagFilterProps & { onTagClick: (tag: string) => void }) => (
  <Drawer>
    <DrawerTrigger className="md:hidden w-full flex items-center justify-between px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
      <span className="capitalize text-sm font-medium">{props.selectedTag}</span>
      <ChevronDown className="h-4 w-4" />
    </DrawerTrigger>
    <DrawerContent>
      <MobileTagFilterContent {...props} />
    </DrawerContent>
  </Drawer>
);

export function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams();
    if (tag !== 'All') {
      params.set('tag', tag);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <DesktopTagFilter tags={tags} selectedTag={selectedTag} tagCounts={tagCounts} onTagClick={handleTagClick} />
      <MobileTagFilter tags={tags} selectedTag={selectedTag} tagCounts={tagCounts} onTagClick={handleTagClick} />
    </>
  );
}
